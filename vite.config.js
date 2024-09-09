import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://stg.carwale.com/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
