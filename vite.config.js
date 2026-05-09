export default defineConfig({
  plugins: [react()],
  base: '/',   // ✅ correct for Vercel / Netlify / normal hosting

  server: {
    host: true,
  },
});