import fs from 'fs';
import Koa from 'koa';
import path from 'path';
import cors from 'kcors';
// import http2 from 'http2';
import colors from 'colors';
import ip from 'my-local-ip';
import serve from 'koa-static';
import Router from 'koa-router';
// import routes from '../shared/routes';

const port = process.env.PORT || 4000;
const app = new Koa();
const router = new Router();
const filepath = path.resolve('build', 'public', 'index.html');
const template = fs.readFileSync(filepath).toString();

app.use(cors());
app.use(serve('build'));

router.get('*', (ctx) => { ctx.body = template; });

app.use(router.routes()).use(router.allowedMethods());
app.listen(port);

console.log(
  colors.bold.white(`Server current listening :\n`) +
  colors.reset.yellow(`\nMachine access: https://localhost:${port}\n`) +
  colors.reset.yellow(`Network access: https://${ip()}:${port}`)
);
