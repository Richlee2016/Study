/*
 * @Date: 2019-08-22 11:39:42
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-22 17:44:27
 */
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as createError from 'http-errors';
import { Route as RouterSet } from '../decorator/router';
const router = express.Router();
/**
 * 基础中间件添加
 */
export default function feneral(app: express.Express) {
  // 引擎模板
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');

  // 请求日志 打印
  app.use(logger('dev'));

  // 格式化
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // cookie
  app.use(cookieParser());

  // 静态文件夹
  app.use(express.static(path.join(__dirname, '../public')));

  // 注入路由
  const routerDec = new RouterSet(app, router);
  routerDec.init();

  // 404捕捉跳转
  app.use(function(req, res, next) {
    next(createError(404));
  });
}
