import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    // Keep Data Grid in the SSR bundle so CSS imports are transformed
    noExternal: ['@mui/x-data-grid'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    server: {
      // Inline the Data Grid package so Vite handles its CSS imports during tests
      deps: {
        inline: ['@mui/x-data-grid'],
      },
    },
  }
})
