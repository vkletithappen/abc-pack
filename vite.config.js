// import { defineConfig } from 'vite';
// import handlebars from 'vite-plugin-handlebars';
// import { resolve } from 'path';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath, URL } from 'url';

// const rootDir = path.resolve(__dirname);
// const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
// const input = htmlFiles.reduce((obj, file) => {
//   const name = path.basename(file, '.html');
//   obj[name] = path.resolve(rootDir, file);
//   return obj;
// }, {});

// const pageContexts = {
//   'index': {
//     title: 'ABC Pack | Производитель тубусов и гибкой упаковки',
//     description: 'Описание главной страницы',
//     bgClass: 'gray'
//   },
//   'about': {
//     title: 'О нас',
//     description: 'Описание страницы About',
//     bgClass: 'black'
//   }
// };

// export default defineConfig({
//   plugins: [
//     handlebars({
//       partialDirectory: resolve('src/partials'),
//       reloadOnPartialChange: true,
//       context: (pagePath) => {
//         const fileName = path.basename(pagePath, '.html'); // 'index', 'html', ...
//         return pageContexts[fileName] || {}; // если нет записи, возвращаем пустой объект
//       }
//     }),
//     {
//       handleHotUpdate({ file, server }) {
//         if (file.endsWith(".html")) {
//           server.ws.send({
//             type: "full-reload",
//             path: "*",
//           });
//         }
//       }
//     }
//   ],
//   resolve: {
//     alias: [
//       {
//         find: '@',
//         replacement: fileURLToPath(new URL('./src', import.meta.url))
//       },
//     ]
//   },
//   css: {
//     devSourcemap: true,
//   },
//   optimizeDeps: {
//     force: true,
//   },
//   server: {
//     watch: {
//       usePolling: true,
//       interval: 500,
//     },
//   },
//   build: {
//     rollupOptions: { input }
//   },
// });

import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import path from 'path';
import fs from 'fs';
import { fileURLToPath, URL } from 'url';
import { generate } from 'critical';
import crypto from 'crypto';

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

// 📁 Папка для кеша critical CSS
const cacheDir = path.resolve('.critical-cache');
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve('src/partials'),
      reloadOnPartialChange: true,
      context: (pagePath) => {
        const fileName = path.basename(pagePath, '.html');
        return pageContexts[fileName] || {};
      }
    }),
    {
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.html')) {
          server.ws.send({ type: 'full-reload', path: '*' });
        }
      }
    },
    {
      name: 'html-critical-css-cache',
      enforce: 'post',
      async writeBundle(_, bundle) {
        const htmlFiles = Object.keys(bundle).filter(f => f.endsWith('.html'));

        for (const file of htmlFiles) {
          const distPath = path.join('dist', file);
          const html = fs.readFileSync(distPath, 'utf8');
          const hash = crypto.createHash('md5').update(html).digest('hex');
          const cacheFile = path.join(cacheDir, `${file}.json`);

          let cacheData = null;
          if (fs.existsSync(cacheFile)) {
            try {
              cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
            } catch {
              cacheData = null;
            }
          }

          // 🧠 Проверяем: если HTML не изменился — пропускаем
          if (cacheData && cacheData.hash === hash) {
            console.log(`🟡 Critical CSS кешировано для ${file}, пропускаем`);
            fs.writeFileSync(distPath, cacheData.html); // записываем готовый HTML
            continue;
          }

          try {
            console.log(`⚙️ Генерация critical CSS для ${file}...`);
            const { html: processedHtml } = await generate({
              base: 'dist/',
              html,
              inline: true,
              width: 1300,
              height: 900,
              minify: true,
              extract: true,
            });

            const finalHtml = processedHtml.replace(
              /<link rel="stylesheet" href="(\/assets\/.+?\.css)">/g,
              (_, href) => `
<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="${href}"></noscript>`
            );

            // 💾 Сохраняем кэш
            fs.writeFileSync(distPath, finalHtml);
            fs.writeFileSync(cacheFile, JSON.stringify({ hash, html: finalHtml }, null, 2));

            console.log(`✅ Critical CSS встроен и закеширован: ${file}`);
          } catch (err) {
            console.error(`❌ Ошибка генерации critical CSS для ${file}:`, err);
          }
        }
      }
    }
  ],

  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ]
  },

  css: { devSourcemap: true },
  optimizeDeps: { force: true },

  server: {
    watch: { usePolling: true, interval: 500 },
  },

  build: { rollupOptions: { input } },
});