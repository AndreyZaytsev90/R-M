import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
      include: '**/*.svg' // все SVG как компоненты по умолчанию
    })
  ],
  resolve: {
    alias: {
      // «@» будет указывать на папку src
      '@': resolve(__dirname, 'src')
    }
  }
});
