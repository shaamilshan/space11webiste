import { createApiApp } from './app.js';
import { ensureStorage } from './storage.js';

const PORT = Number(process.env.PORT) || 3001;
const app = createApiApp({ serveStaticDist: true });

ensureStorage()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SPACE11 API server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize storage:', err);
    process.exit(1);
  });
