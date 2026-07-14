import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/menyim/",
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    watch: {
      // Ignore temp/partial download files so Vite doesn't crash
      // when Chrome downloads photos directly into the memories folder
      ignored: [
        '**/*.crdownload',  // Chrome partial downloads
        '**/*.part',        // Firefox partial downloads
        '**/*.tmp',
        '**/*.temp',
        '**/*.download',
        '**/Unconfirmed*',  // Chrome "Unconfirmed XXXXXX.crdownload" files
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          gesture: ['@use-gesture/react'],
        },
      },
    },
  },
})
