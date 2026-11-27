import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import multer from 'multer';
import {
  StorageConfigError,
  UPLOADS_DIR,
  createGalleryItem,
  createTestimonial,
  deleteGalleryItem,
  deleteTestimonial,
  getStorageMode,
  readContent,
  saveUploadedImage,
  updateGalleryItem,
  updateTestimonial
} from './storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'space11admin';
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  crypto.createHash('sha256').update(`${ADMIN_PASSWORD}:space11-session`).digest('hex');
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const ALLOWED_MIME_EXTENSIONS = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif'
};

const revokedTokens = new Set();

function sha256(value) {
  return crypto.createHash('sha256').update(String(value)).digest();
}

function isValidPassword(input) {
  if (typeof input !== 'string' || !input) return false;
  return crypto.timingSafeEqual(sha256(input), sha256(ADMIN_PASSWORD));
}

function createSessionToken() {
  const payload = {
    iat: Date.now(),
    exp: Date.now() + TOKEN_TTL_MS,
    jti: crypto.randomUUID()
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');
  return {
    token: `${encodedPayload}.${signature}`,
    expiresAt: payload.exp
  };
}

function verifySessionToken(token) {
  if (typeof token !== 'string' || !token.includes('.') || revokedTokens.has(token)) {
    return null;
  }

  const [encodedPayload, providedSignature] = token.split('.');
  if (!encodedPayload || !providedSignature) return null;

  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  const sigA = Buffer.from(providedSignature);
  const sigB = Buffer.from(expectedSignature);
  if (sigA.length !== sigB.length || !crypto.timingSafeEqual(sigA, sigB)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function extractBearerToken(req) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return null;
  return auth.slice(7).trim();
}

function requireAdmin(req, res, next) {
  const token = extractBearerToken(req);
  const session = verifySessionToken(token);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized. Please log in to the admin panel.' });
  }
  req.adminSession = session;
  req.adminToken = token;
  next();
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function clampRating(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 5;
  return Math.min(5, Math.max(1, Math.round(num)));
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_EXTENSIONS[file.mimetype]) {
      cb(new Error('Only JPG, PNG, WEBP, GIF, and AVIF images are allowed.'));
      return;
    }
    cb(null, true);
  }
});

/**
 * Builds the Express API app for SPACE11 dynamic content and uploads.
 */
export function createApiApp({ serveStaticDist = false } = {}) {
  const app = express();
  app.use((req, _res, next) => {
    if (req.body !== undefined && !req._body) {
      req._body = true;
    }
    next();
  });
  app.use(express.json({ limit: '1mb' }));

  if (getStorageMode() === 'local') {
    app.use('/uploads', express.static(UPLOADS_DIR));
  }

  app.get('/api/health', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json({ ok: true, storage: getStorageMode() });
  });

  app.get('/api/content', async (_req, res, next) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      const content = await readContent();
      res.json(content);
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/admin/login', (req, res) => {
    if (getStorageMode() === 'unconfigured') {
      return res.status(503).json({
        error:
          'Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel Environment Variables and run supabase/schema.sql.'
      });
    }

    const password = req.body?.password;
    if (!isValidPassword(password)) {
      return res.status(401).json({ error: 'Invalid admin password.' });
    }
    const session = createSessionToken();
    res.json(session);
  });

  app.post('/api/admin/logout', (req, res) => {
    const token = extractBearerToken(req);
    if (token) {
      revokedTokens.add(token);
    }
    res.json({ ok: true });
  });

  app.get('/api/admin/session', requireAdmin, (req, res) => {
    res.json({ authenticated: true, expiresAt: req.adminSession.exp });
  });

  app.post('/api/upload', requireAdmin, (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message || 'Image upload failed.' });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided.' });
      }

      try {
        const extension = ALLOWED_MIME_EXTENSIONS[req.file.mimetype] || '.jpg';
        const result = await saveUploadedImage({
          buffer: req.file.buffer,
          extension,
          mimetype: req.file.mimetype
        });
        res.status(201).json(result);
      } catch (uploadErr) {
        next(uploadErr);
      }
    });
  });

  // Gallery CRUD
  app.post('/api/gallery', requireAdmin, async (req, res, next) => {
    try {
      const title = normalizeString(req.body?.title);
      const category = normalizeString(req.body?.category);
      const src = normalizeString(req.body?.src);

      if (!title || !category || !src) {
        return res.status(400).json({ error: 'Title, category, and image are required.' });
      }

      const result = await createGalleryItem({ title, category, src });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });

  app.put('/api/gallery/:id', requireAdmin, async (req, res, next) => {
    try {
      const { id } = req.params;
      const title = normalizeString(req.body?.title);
      const category = normalizeString(req.body?.category);
      const src = normalizeString(req.body?.src);

      if (!title || !category || !src) {
        return res.status(400).json({ error: 'Title, category, and image are required.' });
      }

      const result = await updateGalleryItem(id, { title, category, src });
      if (!result) {
        return res.status(404).json({ error: 'Gallery item not found.' });
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  app.delete('/api/gallery/:id', requireAdmin, async (req, res, next) => {
    try {
      const result = await deleteGalleryItem(req.params.id);
      if (!result) {
        return res.status(404).json({ error: 'Gallery item not found.' });
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  // Testimonials CRUD
  app.post('/api/testimonials', requireAdmin, async (req, res, next) => {
    try {
      const author = normalizeString(req.body?.author);
      const role = normalizeString(req.body?.role);
      const quote = normalizeString(req.body?.quote);
      const avatar = normalizeString(req.body?.avatar);
      const rating = clampRating(req.body?.rating);

      if (!author || !role || !quote) {
        return res.status(400).json({ error: 'Author, role, and testimonial quote are required.' });
      }

      const result = await createTestimonial({ author, role, quote, rating, avatar });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });

  app.put('/api/testimonials/:id', requireAdmin, async (req, res, next) => {
    try {
      const author = normalizeString(req.body?.author);
      const role = normalizeString(req.body?.role);
      const quote = normalizeString(req.body?.quote);
      const avatar = normalizeString(req.body?.avatar);
      const rating = clampRating(req.body?.rating);

      if (!author || !role || !quote) {
        return res.status(400).json({ error: 'Author, role, and testimonial quote are required.' });
      }

      const result = await updateTestimonial(req.params.id, {
        author,
        role,
        quote,
        rating,
        avatar
      });
      if (!result) {
        return res.status(404).json({ error: 'Testimonial not found.' });
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  app.delete('/api/testimonials/:id', requireAdmin, async (req, res, next) => {
    try {
      const result = await deleteTestimonial(req.params.id);
      if (!result) {
        return res.status(404).json({ error: 'Testimonial not found.' });
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'API route not found.' });
  });

  if (serveStaticDist && fs.existsSync(DIST_DIR)) {
    app.use(express.static(DIST_DIR));
    app.get(/^(?!\/api|\/uploads).*/, (_req, res) => {
      res.sendFile(path.join(DIST_DIR, 'index.html'));
    });
  }

  app.use((err, _req, res, _next) => {
    console.error(err);
    if (err instanceof StorageConfigError) {
      return res.status(err.status).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || 'Internal server error.' });
  });

  return app;
}
