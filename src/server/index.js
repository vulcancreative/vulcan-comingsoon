import fs from 'fs';
import Koa from 'koa';
import path from 'path';
import cors from 'kcors';
import React from 'react';
import colors from 'colors';
import ip from 'my-local-ip';
import serve from 'koa-static';
import Router from 'koa-router';
import App from '../browser/app';
import compress from 'koa-compress';
import htmlMinifier from 'koa-html-minifier';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

const isDev = process.env.NODE_ENV.includes('dev');
const port = process.env.PORT || 3000;

const app = new Koa();
const router = new Router();
const filepath = path.resolve('build', 'templates', 'index.html');
const template = fs.readFileSync(filepath).toString();

app.use(cors());

if (isDev) app.use(serve('build'));

app.use(compress());
app.use(htmlMinifier({ collapseWhitespace: true }));

router.get('*', (ctx) => {
  const markup = renderToString(
    <StaticRouter location={ctx.req.url} context={{}}>
      <App />
    </StaticRouter>
  );

  const result = template.replace(
    /<div id="root">.*<\/div>/gm,
    `
    <script>
      window.__DATA_LOADED__ = true;
    </script>
    <div id="root">${markup}</div>
    `
  );

  if (markup.includes("<h1>Ah, dammit…</h1>")) ctx.status = 404;
  ctx.body = result;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(port);

console.log(
  colors.bold.white(`Server current listening :\n`) +
  colors.reset.yellow(`\nMachine access: https://localhost:${port}\n`) +
  colors.reset.yellow(`Network access: https://${ip()}:${port}`)
);
