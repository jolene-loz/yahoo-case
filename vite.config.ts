import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/yahoo-case/',
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress unused import warnings
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
        warn(warning)
      }
    }
  }
})