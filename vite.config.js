import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import path from 'path';
import fs from 'fs';
import { fileURLToPath, URL } from 'url';

const rootDir = path.resolve(__dirname);
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
const input = htmlFiles.reduce((obj, file) => {
  const name = path.basename(file, '.html');
  obj[name] = path.resolve(rootDir, file);
  return obj;
}, {});

const pageContexts = {
  'index': {
    title: 'ABC Pack | Производитель тубусов и гибкой упаковки',
    description: 'Описание главной страницы',
    bgClass: 'gray'
  },
  'about': {
    title: 'О нас',
    description: 'Описание страницы About',
    bgClass: 'black'
  }
};

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve('src/partials'),
      reloadOnPartialChange: true,
      context: (pagePath) => {
        const fileName = path.basename(pagePath, '.html'); // 'index', 'html', ...
        return pageContexts[fileName] || {}; // если нет записи, возвращаем пустой объект
      }
    }),
    {
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".html")) {
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      }
    }
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
    ]
  },
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    force: true,
  },
  server: {
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
  build: {
    rollupOptions: { input }
  },
});