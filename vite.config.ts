import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Serve static HTML pages under public/ before SPA fallback
function staticPages(paths: string[]): Plugin {
  return {
    name: 'static-pages',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        for (const p of paths) {
          if (url === p || url === p + '/') {
            req.url = p + '/index.html'
            break
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    staticPages(['/style-guide']),
    react(),
  ],
})
