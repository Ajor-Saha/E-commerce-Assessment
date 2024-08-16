import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/products': {
        target: 'https://fakestoreapi.com',
        secure: false,
      },
    },
  },

  plugins: [react()],
});
