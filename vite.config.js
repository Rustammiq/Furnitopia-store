import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  server: {
    port: 3000,
    host: true,
    https: true,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        beds: 'beds.html',
        arTest: 'ar-test.html'
      }
    }
  },
  optimizeDeps: {
    include: ['three', '@google/model-viewer']
  }
})
