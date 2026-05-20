import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: '/R-M/', // имя вашего репозитория на GitHub
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
