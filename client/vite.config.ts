import path from 'path';

import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir: 'fetch-web/assets',
    chunkSizeWarningLimit: 1600,
    emptyOutDir: true,
    minify: true,
    modulePreload: false,
    rollupOptions: {
      output: {
        assetFileNames: `fetch-web/assets/[name].[ext]`,
        chunkFileNames: `fetch-web/chunk-[name].js`,
        entryFileNames: `fetch-web/entry-[name].js`,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: true,
    }),
    ViteImageOptimizer({}),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
});
