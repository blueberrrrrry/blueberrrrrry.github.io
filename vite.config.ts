import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // blueberrrrrry.github.io 사용자 페이지 → 루트(/)에서 서빙
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2015',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-ga4'],
          animations: ['framer-motion', 'gsap'],
          ui: ['lucide-react', 'react-type-animation']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  },
  server: {
    host: true,
    port: 5173
  }
})
