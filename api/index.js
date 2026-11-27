import { createApiApp } from '../server/app.js';

const app = createApiApp({ serveStaticDist: false });

export default app;
