import mongoose from 'mongoose'
import { Injectable } from '../assets/decorator'
import Crawler from './helper/crawler'
import { HomeConfig, OlineConfig } from './helper/config'
@Injectable()
class CrawlerServer extends Crawler {
  constructor () {
    super()
    this.Movie = mongoose.model('t_movie_home')
    this.Group = mongoose.model('t_movie_group')
    this.Online = mongoose.model('t_movie_online')
    this.HomeMovieConfig = HomeConfig
    this.OnlineMovieConfig = OlineConfig
  }

  async updateMovieHome () {
    try {
      const browser = await this.puppeteer.launch()

      const page = await browser.newPage()

      await page.goto(this.HomeMovieConfig.newest, {
        waitUntil: 'networkidle2',
        timeout: 3000000
      })

      await this._sleep(3, 5, t => { console.log(`缓冲${t}后 进入最新电影获取...`) })

      // 获取到页面最新电影ID
      const maxId = await page.evaluate(() => {
        var $ = window.jQuery
        var list = $('.movielist li>a')
        var idList = $.map(list, function (o, i) {
          return ($(o).attr('href').match(/\d+/g)[0] || '')
        })
        return Math.max.apply(Math, idList)
      })
      console.log('maxId:', maxId)

      // 递归添加新电影
      const setMovie = async () => {
        // 获取数据库最新ID
        const [dbLastData] = await this.Movie.find().sort({ _id: -1 }).limit(1).exec()
        const dbLastId = dbLastData.id

        if (maxId > dbLastId) {
          console.log(maxId, dbLastId)
          const uuid = dbLastId + 1
          console.log('src', this.HomeMovieConfig.sub(uuid))
          await page.goto(this.HomeMovieConfig.sub(uuid), {
            waitUntil: 'networkidle2',
            timeout: 3000000
          })

          await this._sleep(5, 8, t => {
            console.log(`缓冲${t}后 进入${uuid}电影获取...`)
          })

          // 获取新电影 内容
          const getNewMovie = await page.evaluate(() => {
            var $ = window.jQuery

            if ($('#main').size() === 0) {
              return { name: 'none' }
            }

            function Html () {
              this.data = {}
              this.reg = {
                num: /(\d+)/g,
                china: /[\u4e00-\u9fa5]+/g
              }
              this.init()
            }

            Html.prototype = {
              init: function () {
                this.data = {
                  name: $('#name').text(),
                  img:
                    $('.pic img').attr('original') || $('.pic img').attr('src'),
                  intro: $('.mox .endtext').text(),
                  catalog: this._mptext($('.location a')),
                  isFinish: true,
                  score: $('#filmStarScore').text()
                }
                this.info()
                this.geturl()
              },
              info: function () {
                var data = {}
                var that = this
                $('.info ul li').each(function (i, o) {
                  var span = $(o).find('span').text()
                  if (span === '又名：' || span === 'IMDB：') {
                    $(o).remove()
                  }
                  switch (span) {
                    case '更新至：':
                      data.isFinish = false
                      break
                    case '上映年代：地区：':
                      var ya = that._ya($(o))
                      data.year = ya.year
                      data.area = ya.area
                      break
                    case '类型：':
                      data.classify = that._mptext($(o).find('>a'))
                      break
                    case '导演：':
                      data.director = that._mptext($(o).find('>a'))
                      break
                    case '主演：':
                      data.actor = that._mptext($(o).find('>a'))
                      break
                  }
                })
                this.data = $.extend({}, this.data, data)
              },
              geturl: function () {
                var list = $('.down_list')
                var data = {}
                var allList = []
                $.map(list, function (o, i) {
                  var boxs = $(o).find('>ul li')
                  var mylist = $.map(boxs, function (n, j) {
                    return {
                      title: $(n).find('.down_part_name a').text(),
                      url: $(n).find('input').val(),
                      size: $(n).find('.file-size').text()
                    }
                  })
                  allList.push(mylist)
                  return mylist
                })
                data.url = allList
                this.data = $.extend({}, this.data, data)
              },
              _ya: function (dom) {
                dom.find('span').remove()
                var text = dom.text().trim()
                return {
                  year: text.match(this.reg.num)[0] || '',
                  area: text.match(this.reg.china)[0] || ''
                }
              },
              _mptext: function (list) {
                return $.map(list, function (o, i) {
                  return $(o).text()
                })
              },
              _outspan: function (n) {
                $('.info ul li').eq(n).find('span').remove()
                return $('.info ul li').eq(n).text().trim()
              }
            }
            var _html = new Html()
            return _html.data
          })
          console.log('getNewMovie', getNewMovie.name)
          await this.Movie.movieSave(
            Object.assign(getNewMovie, {
              id: uuid
            })
          )
          await setMovie()
        }
      }
      await setMovie()
      console.log(`最新电影为${maxId}，已经完成更新，关闭浏览器`)
      await browser.close()
    } catch (error) {
      console.log(error)
      this.updateMovieHome()
    }
  }

  async uploadOnline () {
    const LastOnline = await this.Online.find({}).countDocuments().exec()
    let box = []
    for (let i = LastOnline + 1; i < LastOnline + 2; i++) {
      box.push(this._readFile(i))
    }
    const start = new Date()
    const pros = await Promise.all(box)
    const ms = new Date() - start
    console.log('使用了===>', ms)
    const data = pros.map(o => {
      const dataRes = this._online(o)
      dataRes._id = dataRes.id
      return dataRes
    })
    const insert = await this.Online.insertMany(data)
    if (insert.length !== 99) {
      console.log('清洗完成')
    } else {
      await this.uploadOnline()
    }
    return data
  }

  async ProxyOnlineSearch (wd) {
    const opt = {
      url: this.OnlineMovieConfig.search(encodeURIComponent(wd)),
      method: 'GET'
    }
    try {
      const res = await this.ctx.axios(opt)
      if (res.includes(400)) return
      return this._onlineSearch(res)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new CrawlerServer()
