import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' — относительные пути: работает и на GitHub Pages (/repo-name/),
// и на Amvera / любом другом хостинге в корне домена.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: '0.0.0.0', port: 3000, allowedHosts: true },
  preview: { host: '0.0.0.0', port: 3000, allowedHosts: true }
});
