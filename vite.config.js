import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createApiApp } from './server/app.js'
import { ensureStorage } from './server/storage.js'

function space11ApiPlugin() {
  return {
    name: 'space11-api-middleware',
    configureServer(server) {
      const app = createApiApp({ serveStaticDist: false })
      const storageReady = ensureStorage().catch((err) => {
        console.error('Failed to initialize storage:', err)
      })

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (url === '/api' || url.startsWith('/api/') || url.startsWith('/uploads/')) {
          await storageReady
          return app(req, res, next)
        }
        return next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), space11ApiPlugin()],
})
