/*
 * @Date: 2019-08-22 12:40:10
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-22 17:38:28
 * 路由装饰器
 */
import { Router, Express, RequestHandler } from 'express';
import * as glob from 'glob';
import { resolve } from 'path';
import { isArray } from 'util';

type RequestHand = RequestHandler | RequestHandler[];

interface MethodOpt {
  method: 'get' | 'post';
  path: string;
  controller: any;
  middleware?: RequestHand;
}

let routerMap = new Map<MethodOpt, RequestHandler>();
const symbolController = Symbol('controller');
const symbolMiddleware = Symbol('middleware');

export class Route {
  public router: Router;
  public app: Express;
  constructor(app: Express, router: Router) {
    this.app = app;
    this.router = router;
  }

  init() {
    this.setRouter();
  }

  setRouter() {
    const appPath = resolve(__dirname, '../');
    // 获取全部controller
    glob.sync(resolve(appPath, './controllers/*.ts')).forEach(require);
    // 循环获取注入路由
    for (const [controllOpt, controFn] of routerMap) {
      const { controller, path, method, middleware } = controllOpt;
      const routePath = controller[symbolController] + path === '/' ? '' : path;
      const controllerMids = controller[symbolMiddleware];
      let cmids: RequestHandler[] = [];
      let mids: RequestHandler[] = [];
      // 控制器中间件
      if (controllerMids) {
        cmids = isArray(controllerMids) ? controllerMids : [controllerMids];
      }
      // 路由 中间件
      if (middleware) {
        mids = isArray(middleware) ? middleware : [middleware];
      }

      const allMids = cmids.concat(mids);

      if (allMids && allMids.length > 0) {
        this.router[method](routePath, ...allMids, controFn);
      } else {
        this.router[method](routePath, controFn);
      }
    }
    this.app.use('/', this.router);
  }
}

const setRouter = (opt: any) => (target: any, name: string) => {
  routerMap.set({ controller: target, ...opt }, target[name]);
};

export function Get(path: string, middleware?: RequestHand) {
  return setRouter({
    method: 'get',
    path,
    middleware,
  });
}

export function Post(path: string, middleware?: RequestHand) {
  return setRouter({
    method: 'post',
    path,
    middleware,
  });
}

export function Controller(path: string, middleware?: RequestHand) {
  return (target: any) => {
    target.prototype[symbolController] = path;
    target.prototype[symbolMiddleware] = middleware;
  };
}
