import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/proxy': {
        target: 'http://mod.kubg.edu.ua',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, '/cgi-bin/timetable.cgi')
      }
    }
  }
})
