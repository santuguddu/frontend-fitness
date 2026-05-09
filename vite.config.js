import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // IMPORTANT: GitHub Pages base path
  // Change "frontend-fitness" if your repo name is different
  base: '/frontend-fitness/',

  server: {
    host: false,
  },
});