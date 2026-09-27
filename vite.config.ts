import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  // Default to root, which is used by Netlify
  let base = '/';

  if (process.env.GITHUB_ACTIONS) {
    // Default GitHub Pages base (repository name)
    base = '/librecompass/';
  }

  // Allow explicit override (e.g., from Docker ARG)
  if (process.env.VITE_BASE) {
    base = process.env.VITE_BASE;
  }

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
