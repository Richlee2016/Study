/*
 * @Date: 2019-08-22 17:53:03
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-22 17:58:26
 */
import { Request, Response, NextFunction } from 'express';
export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    await next();
  } catch (err) {
    const status = err.status || 500;
    const error_msg = status === 500 ? 'Internal Server Error' : err.message;
  }
}
