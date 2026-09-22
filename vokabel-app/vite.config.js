import { defineConfig } from 'vite';

export default defineConfig({
  // Relative paths so GitHub / CDN hosting works without a fixed base path
  base: './',
  server: {
    // Allow Cloudflare quick tunnels and similar public hosts
    allowedHosts: true,
  },
});
