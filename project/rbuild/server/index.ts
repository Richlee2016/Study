/*
 * @Date: 2019-08-22 09:58:20
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-22 17:49:58
 */
import * as express from 'express';
import chalk from 'chalk';
import bug from 'debug';

const debug = bug('server:*');

const MIDDLEWARES = ['general'];

class App {
  public app: express.Express = express();

  constructor() {
    this.useMiddleware(this.app)(MIDDLEWARES);
  }
  // 加载中间件
  useMiddleware(app: express.Express) {
    return async (m: string[]) => {
      const midMap = m.map(o => {
        return import(`./src/middlewares/${o}.ts`);
      });
      const mids = await Promise.all(midMap);
      mids.forEach(mid => mid.default(app));
    };
  }

  start(port: number) {
    this.app.listen(port, () => {
      const link = `http://localhost:${port}`;
      debug(`server is start on ${chalk.green(link)}`);
    });
  }
}

const app = new App();

app.start(3086);
