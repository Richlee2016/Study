/*
 * @Date: 2019-08-22 14:06:34
 * @LastEditors: RichLee
 * @LastEditTime: 2019-08-22 17:23:11
 */
import { Controller, Get, Post } from 'decorator/router';
import { Request, Response } from 'express';
import server from 'servers/home';

@Controller('/')
class Home {
  public server: typeof server = server;
  @Get('/')
  public async index(req: Request, res: Response) {
    res.send('box');
  }
  @Post('/getName')
  public async getName(req: Request, res: Response) {
    const name1 = await server.sayName('richlee');
    const { name } = req.body;
    res.send('nice' + name + name1);
  }
}
