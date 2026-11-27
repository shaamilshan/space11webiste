import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import {
  DEFAULT_GALLERY_CATEGORIES,
  DEFAULT_GALLERY_ITEMS,
  DEFAULT_TESTIMONIALS
} from '../src/data/defaultContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DATA_DIR = path.join(__dirname, 'data');
export const UPLOADS_DIR = path.join(__dirname, 'uploads');
export const CONTENT_FILE = path.join(DATA_DIR, 'content.json');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const SUPABASE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'space11-media';

const SEED_CONTENT = {
  galleryCategories: DEFAULT_GALLERY_CATEGORIES,
  gallery: DEFAULT_GALLERY_ITEMS,
  testimonials: DEFAULT_TESTIMONIALS
};

let writeQueue = Promise.resolve();
let supabaseClient = null;

export class StorageConfigError extends Error {
  constructor(message, status = 503) {
    super(message);
    this.name = 'StorageConfigError';
    this.status = status;
  }
}

export function getStorageMode() {
  if (SUPABASE_URL && SUPABASE_KEY) {
    return 'supabase';
  }
  if (process.env.VERCEL) {
    return 'unconfigured';
  }
  return 'local';
}

function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new StorageConfigError(
      'Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel Environment Variables and run supabase/schema.sql.'
    );
  }
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }
  return supabaseClient;
}

function buildCategories(galleryItems, configured = DEFAULT_GALLERY_CATEGORIES) {
  const set = new Set(configured);
  galleryItems.forEach((item) => {
    if (item?.category) set.add(item.category);
  });
  return [...set];
}

function mapGalleryRow(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    src: row.src,
    createdAt: row.created_at,
    updatedAt: row.updated_at || undefined
  };
}

function mapTestimonialRow(row) {
  return {
    id: row.id,
    author: row.author,
    role: row.role,
    quote: row.quote,
    rating: row.rating,
    avatar: row.avatar || '',
    createdAt: row.created_at,
    updatedAt: row.updated_at || undefined
  };
}

/**
 * Ensures local storage directories and seed file exist when running in local mode.
 */
export async function ensureStorage() {
  if (getStorageMode() !== 'local') {
    return;
  }

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  try {
    await fs.access(CONTENT_FILE);
  } catch {
    await fs.writeFile(CONTENT_FILE, JSON.stringify(SEED_CONTENT, null, 2), 'utf8');
  }
}

async function readLocalContent() {
  await ensureStorage();
  const raw = await fs.readFile(CONTENT_FILE, 'utf8');
  const parsed = JSON.parse(raw);

  const gallery = Array.isArray(parsed.gallery) ? parsed.gallery : [];
  const testimonials = Array.isArray(parsed.testimonials) ? parsed.testimonials : [];
  const configured = Array.isArray(parsed.galleryCategories)
    ? parsed.galleryCategories
    : DEFAULT_GALLERY_CATEGORIES;

  return {
    galleryCategories: buildCategories(gallery, configured),
    gallery,
    testimonials
  };
}

function updateLocalContent(mutator) {
  const run = writeQueue.then(async () => {
    const current = await readLocalContent();
    const next = await mutator(structuredClone(current));
    const tempFile = `${CONTENT_FILE}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(next, null, 2), 'utf8');
    await fs.rename(tempFile, CONTENT_FILE);
    return next;
  });

  writeQueue = run.catch(() => {});
  return run;
}

async function cleanupLocalUpload(url, content) {
  if (typeof url !== 'string' || !url.startsWith('/uploads/')) {
    return;
  }

  const stillReferenced =
    content.gallery.some((item) => item.src === url) ||
    content.testimonials.some((item) => item.avatar === url);

  if (stillReferenced) return;

  const filePath = path.join(UPLOADS_DIR, path.basename(url));
  if (!filePath.startsWith(UPLOADS_DIR)) return;

  try {
    await fs.unlink(filePath);
  } catch {
    // Ignore missing files during cleanup
  }
}

async function readSupabaseGallery() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Supabase gallery read failed: ${error.message}`);
  }

  const gallery = (data || []).map(mapGalleryRow);
  return {
    gallery,
    galleryCategories: buildCategories(gallery)
  };
}

async function readSupabaseTestimonials() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Supabase testimonials read failed: ${error.message}`);
  }

  return (data || []).map(mapTestimonialRow);
}

function extractSupabaseObjectPath(url) {
  if (typeof url !== 'string' || !url) return null;
  const marker = `/storage/v1/object/public/${SUPABASE_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url.slice(idx + marker.length).split('?')[0]);
}

async function cleanupSupabaseUpload(url) {
  const objectPath = extractSupabaseObjectPath(url);
  if (!objectPath) return;

  const [{ gallery }, testimonials] = await Promise.all([
    readSupabaseGallery(),
    readSupabaseTestimonials()
  ]);

  const stillReferenced =
    gallery.some((item) => item.src === url) ||
    testimonials.some((item) => item.avatar === url);

  if (stillReferenced) return;

  const supabase = getSupabase();
  await supabase.storage.from(SUPABASE_BUCKET).remove([objectPath]);
}

export async function readContent() {
  const mode = getStorageMode();
  if (mode === 'unconfigured') {
    return structuredClone(SEED_CONTENT);
  }
  if (mode === 'supabase') {
    const [{ gallery, galleryCategories }, testimonials] = await Promise.all([
      readSupabaseGallery(),
      readSupabaseTestimonials()
    ]);
    return { gallery, galleryCategories, testimonials };
  }
  return readLocalContent();
}

export async function saveUploadedImage({ buffer, extension, mimetype }) {
  const mode = getStorageMode();
  const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}${extension}`;

  if (mode === 'unconfigured') {
    throw new StorageConfigError(
      'Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel Environment Variables.'
    );
  }

  if (mode === 'supabase') {
    const supabase = getSupabase();
    const objectPath = `uploads/${filename}`;
    let { error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(objectPath, buffer, { contentType: mimetype, upsert: false });

    if (error && /bucket/i.test(error.message)) {
      await supabase.storage.createBucket(SUPABASE_BUCKET, { public: true });
      const retry = await supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(objectPath, buffer, { contentType: mimetype, upsert: false });
      error = retry.error;
    }

    if (error) {
      throw new Error(`Supabase image upload failed: ${error.message}`);
    }

    const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(objectPath);
    return { url: data.publicUrl };
  }

  await ensureStorage();
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);
  return { url: `/uploads/${filename}` };
}

export async function createGalleryItem({ title, category, src }) {
  const id = `gal-${crypto.randomUUID().slice(0, 8)}`;
  const createdAt = new Date().toISOString();

  if (getStorageMode() === 'supabase') {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('gallery_items')
      .insert({ id, title, category, src, created_at: createdAt })
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase gallery create failed: ${error.message}`);
    }

    const { gallery, galleryCategories } = await readSupabaseGallery();
    return { item: mapGalleryRow(data), gallery, galleryCategories };
  }

  const item = { id, title, category, src, createdAt };
  const next = await updateLocalContent((content) => {
    content.gallery.unshift(item);
    content.galleryCategories = buildCategories(content.gallery, content.galleryCategories);
    return content;
  });
  return { item, gallery: next.gallery, galleryCategories: next.galleryCategories };
}

export async function updateGalleryItem(id, { title, category, src }) {
  const updatedAt = new Date().toISOString();

  if (getStorageMode() === 'supabase') {
    const supabase = getSupabase();
    const { data: existing } = await supabase
      .from('gallery_items')
      .select('src')
      .eq('id', id)
      .maybeSingle();

    if (!existing) return null;

    const { data, error } = await supabase
      .from('gallery_items')
      .update({ title, category, src, updated_at: updatedAt })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase gallery update failed: ${error.message}`);
    }

    if (existing.src && existing.src !== src) {
      await cleanupSupabaseUpload(existing.src);
    }

    const { gallery, galleryCategories } = await readSupabaseGallery();
    return { item: mapGalleryRow(data), gallery, galleryCategories };
  }

  let previousSrc = null;
  let updatedItem = null;

  const next = await updateLocalContent((content) => {
    const idx = content.gallery.findIndex((g) => g.id === id);
    if (idx === -1) return content;

    previousSrc = content.gallery[idx].src;
    updatedItem = { ...content.gallery[idx], title, category, src, updatedAt };
    content.gallery[idx] = updatedItem;
    content.galleryCategories = buildCategories(content.gallery, content.galleryCategories);
    return content;
  });

  if (!updatedItem) return null;
  if (previousSrc && previousSrc !== src) {
    await cleanupLocalUpload(previousSrc, next);
  }

  return { item: updatedItem, gallery: next.gallery, galleryCategories: next.galleryCategories };
}

export async function deleteGalleryItem(id) {
  if (getStorageMode() === 'supabase') {
    const supabase = getSupabase();
    const { data: existing } = await supabase
      .from('gallery_items')
      .select('src')
      .eq('id', id)
      .maybeSingle();

    if (!existing) return null;

    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (error) {
      throw new Error(`Supabase gallery delete failed: ${error.message}`);
    }

    await cleanupSupabaseUpload(existing.src);
    return readSupabaseGallery();
  }

  let removedItem = null;
  const next = await updateLocalContent((content) => {
    const idx = content.gallery.findIndex((g) => g.id === id);
    if (idx !== -1) {
      [removedItem] = content.gallery.splice(idx, 1);
    }
    return content;
  });

  if (!removedItem) return null;
  await cleanupLocalUpload(removedItem.src, next);
  return { gallery: next.gallery, galleryCategories: next.galleryCategories };
}

export async function createTestimonial({ author, role, quote, rating, avatar }) {
  const id = `test-${crypto.randomUUID().slice(0, 8)}`;
  const createdAt = new Date().toISOString();

  if (getStorageMode() === 'supabase') {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('testimonials')
      .insert({ id, author, role, quote, rating, avatar, created_at: createdAt })
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase testimonial create failed: ${error.message}`);
    }

    const testimonials = await readSupabaseTestimonials();
    return { item: mapTestimonialRow(data), testimonials };
  }

  const item = { id, author, role, quote, rating, avatar, createdAt };
  const next = await updateLocalContent((content) => {
    content.testimonials.unshift(item);
    return content;
  });
  return { item, testimonials: next.testimonials };
}

export async function updateTestimonial(id, { author, role, quote, rating, avatar }) {
  const updatedAt = new Date().toISOString();

  if (getStorageMode() === 'supabase') {
    const supabase = getSupabase();
    const { data: existing } = await supabase
      .from('testimonials')
      .select('avatar')
      .eq('id', id)
      .maybeSingle();

    if (!existing) return null;

    const { data, error } = await supabase
      .from('testimonials')
      .update({ author, role, quote, rating, avatar, updated_at: updatedAt })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase testimonial update failed: ${error.message}`);
    }

    if (existing.avatar && existing.avatar !== avatar) {
      await cleanupSupabaseUpload(existing.avatar);
    }

    const testimonials = await readSupabaseTestimonials();
    return { item: mapTestimonialRow(data), testimonials };
  }

  let previousAvatar = null;
  let updatedItem = null;

  const next = await updateLocalContent((content) => {
    const idx = content.testimonials.findIndex((t) => t.id === id);
    if (idx === -1) return content;

    previousAvatar = content.testimonials[idx].avatar;
    updatedItem = {
      ...content.testimonials[idx],
      author,
      role,
      quote,
      rating,
      avatar,
      updatedAt
    };
    content.testimonials[idx] = updatedItem;
    return content;
  });

  if (!updatedItem) return null;
  if (previousAvatar && previousAvatar !== avatar) {
    await cleanupLocalUpload(previousAvatar, next);
  }

  return { item: updatedItem, testimonials: next.testimonials };
}

export async function deleteTestimonial(id) {
  if (getStorageMode() === 'supabase') {
    const supabase = getSupabase();
    const { data: existing } = await supabase
      .from('testimonials')
      .select('avatar')
      .eq('id', id)
      .maybeSingle();

    if (!existing) return null;

    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) {
      throw new Error(`Supabase testimonial delete failed: ${error.message}`);
    }

    await cleanupSupabaseUpload(existing.avatar);
    const testimonials = await readSupabaseTestimonials();
    return { testimonials };
  }

  let removedItem = null;
  const next = await updateLocalContent((content) => {
    const idx = content.testimonials.findIndex((t) => t.id === id);
    if (idx !== -1) {
      [removedItem] = content.testimonials.splice(idx, 1);
    }
    return content;
  });

  if (!removedItem) return null;
  await cleanupLocalUpload(removedItem.avatar, next);
  return { testimonials: next.testimonials };
}
