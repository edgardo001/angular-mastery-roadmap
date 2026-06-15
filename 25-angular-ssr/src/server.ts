import 'zone.js/node';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = resolve(browserDistFolder, 'index.html');

const app = express();
const commonEngine = new CommonEngine();

app.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

app.get('*', (req, res, next) => {
  commonEngine
    .render({
      bootstrap: () => import('./main.server').then(m => m.default),
      documentFilePath: indexHtml,
      url: req.url,
      publicPath: browserDistFolder,
    })
    .then(html => res.send(html))
    .catch(err => next(err));
});

const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
