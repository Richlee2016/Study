import { provide, inject, Context } from "midway";
import { MovieModelType } from "../model/movie";
import * as puppeteer from "puppeteer";

const HOME_PREFIX = "http://www.idyjy.com";
@provide("movieService")
export class MovieService {
  /**
   *沙盒配置
   */
  public pageOption: puppeteer.NavigationOptions = {
    waitUntil: "networkidle2",
    timeout: 3000000
  };

  /**
   *电影家园 爬取配置
   */
  public homeConf = {
    sub: id => `${HOME_PREFIX}/sub/${id}.html`,
    home: HOME_PREFIX,
    newest: `${HOME_PREFIX}/w.asp?p=1&f=3&l=t`,
    bili: s =>
      `https://search.bilibili.com/all?keyword=${s}&from_source=banner_search`,
    search: w => `http://so.idyjy.com/s.asp?w=${w}`
  };

  /**
   *注入参数
   *@ctx
   *@modle
   */
  @inject()
  ctx: Context;
  @inject("movieModel")
  model: MovieModelType;

  /**
   * 电影家园电影爬取
   */
  public async movieHome() {
    const { ctx } = this;
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
    } catch (error) {}
  }
}
