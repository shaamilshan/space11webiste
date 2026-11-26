import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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

const SEED_CONTENT = {
  galleryCategories: DEFAULT_GALLERY_CATEGORIES,
  gallery: DEFAULT_GALLERY_ITEMS,
  testimonials: DEFAULT_TESTIMONIALS
};

let writeQueue = Promise.resolve();

/**
 * Ensures storage directories and the initial JSON data file exist.
 */
export async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  try {
    await fs.access(CONTENT_FILE);
  } catch {
    await fs.writeFile(CONTENT_FILE, JSON.stringify(SEED_CONTENT, null, 2), 'utf8');
  }
}

/**
 * Reads the persisted content store, normalizing missing keys from defaults.
 */
export async function readContent() {
  await ensureStorage();
  const raw = await fs.readFile(CONTENT_FILE, 'utf8');
  const parsed = JSON.parse(raw);

  return {
    galleryCategories: Array.isArray(parsed.galleryCategories)
      ? parsed.galleryCategories
      : [...DEFAULT_GALLERY_CATEGORIES],
    gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
    testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : []
  };
}

/**
 * Serializes updates to content.json to avoid concurrent write races.
 */
export function updateContent(mutator) {
  const run = writeQueue.then(async () => {
    const current = await readContent();
    const next = await mutator(structuredClone(current));
    const tempFile = `${CONTENT_FILE}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(next, null, 2), 'utf8');
    await fs.rename(tempFile, CONTENT_FILE);
    return next;
  });

  writeQueue = run.catch(() => {});
  return run;
}

/**
 * Deletes an uploaded file if it belongs to /uploads and is no longer referenced.
 */
export async function cleanupUnusedUpload(url, content) {
  if (typeof url !== 'string' || !url.startsWith('/uploads/')) {
    return;
  }

  const stillReferenced =
    content.gallery.some((item) => item.src === url) ||
    content.testimonials.some((item) => item.avatar === url);

  if (stillReferenced) {
    return;
  }

  const filename = path.basename(url);
  const filePath = path.join(UPLOADS_DIR, filename);

  if (!filePath.startsWith(UPLOADS_DIR)) {
    return;
  }

  try {
    await fs.unlink(filePath);
  } catch {
    // Ignore missing files during cleanup
  }
}
