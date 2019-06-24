/**
 * 电影储存接口
 */
export interface IMovie {
  /**
   * 名称
   */
  name: string;
  /**
   * 评分
   */
  score: number;
  /**
   * 地区
   */
  area: string;
  /**
   * 其他名字
   */
  othername: string;
  /**
   * 年份
   */
  year: number;
  /**
   * 图片
   */
  img: string;
  /**
   * 七牛图片
   */
  cover: string;
  /**
   * 是否完结
   */
  isFinish: string;
  /**
   * imdb评分
   */
  imdb: string;
  /**
   * 影片种类
   */
  catalog: string[];
  /**
   * 影片分类
   */
  classify: string[];
  /**
   * 演员
   */
  actor: string[];
  /**
   * 导演
   */
  director: string[];
  /**
   * 简介
   */
  intro: string;
  /**
   * 下载地址
   */
  url: Array<string[]>;
  /**
   * 更新时间
   */
  meta: {
    createAt: number;
    updateAt: number;
  };
}
/**
 * 电影搜索接口
 */
export interface SearchMovie {
  /**
   * 分页页数
   */
  page?: number;
  /**
   * 电影个数
   */
  size?: number;
  /**
   * 年份
   */
  year?: number;
  /**
   * 导演
   */
  director?: string;
  /**
   * 演员
   */
  actor?: string;
  /**
   * 分类
   */
  classify?: string;
  /**
   * 种类
   */
  catalog?: string;
}
