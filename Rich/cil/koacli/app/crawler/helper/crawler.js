import puppeteer from 'puppeteer'
import cheerio from 'cheerio'
import fs from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'
import { ONLINE } from './config'
import _ from 'lodash'
class Crawler {
  constructor () {
    this.puppeteer = puppeteer
  }

  _sleep (start, end, fn) {
    if (start >= end) {
      end = 0
    }
    let ran = Math.ceil((Math.random() * (end - start) + start) * 1000)
    let time = end ? ran : start * 1000
    fn && fn(time)
    return new Promise(resolve => {
      setTimeout(function () {
        resolve(time)
      }, time)
    })
  }

  async _brower (handle, errhandle) {
    try {
      const browser = await this.puppeteer.launch()

      const page = await browser.newPage()

      const goPage = async (url, timeout = 3000000) => {
        const res = await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout
        })
        return res
      }

      handle && (await handle(browser, page, goPage))

      await browser.close()
    } catch (error) {
      console.log(error)
      errhandle && (await errhandle())
    }
  }

  _online (html) {
    const $ = cheerio.load(html)
    const content = $('.content')
    const dom = {
      $img: content.find('dt a'),
      $name: content.find('dt a span').eq(1),
      $head: content.find('dd ul li'),
      $play: $('#playlist')
    }
    dom.$head.eq(4).find('span').remove()
    dom.$head.eq(5).find('span').remove()
    const _id = $('.hy-index-tags .head a').eq(2).attr('href')
    return {
      id: /(\d+)/g.test(_id) ? Number(RegExp.$1) : '',
      img: /\((.+)\)/.test(dom.$img.attr('style')) ? RegExp.$1 : '',
      name: dom.$name.text(),
      updateTime: /(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2})/.test(dom.$head.eq(0).text()) ? RegExp.$1 : '',
      director: [dom.$head.eq(1).find('a').eq(0).text()],
      actor: dom.$head.eq(1).find('a').not(0).get().map(o => $(o).text()),
      area: dom.$head.eq(2).find('a').text(),
      classify: [dom.$head.eq(3).find('a').text()],
      language: dom.$head.eq(4).text(),
      year: dom.$head.eq(5).text() || 0,
      othername: dom.$head.eq(6).find('a') ? dom.$head.eq(6).find('a').text() : '',
      intro: $('.plot').text(),
      play: dom.$play.find('>div').get().map(o => {
        $(o).find('>a span').remove()
        return {
          name: $(o).find('>a').text(),
          list: $(o).find('>div ul li').get().map(l => {
            const doma = $(l).find('a')
            return { title: doma.text(), href: doma.attr('href') }
          })
        }
      }),
      relevance: $('.hy-video-list').get().map(o => {
        const aDiv = $(o).find('>div')
        const box = num => aDiv.eq(num).find('a').get().map(o => /(\d+)/g.test($(o).attr('href')) ? RegExp.$1 : '')
        return {
          title: aDiv.eq(0).find('h3').text(),
          list: box(1).concat(box(2))
        }
      })
    }
  }

  // 代理搜索
  _onlineSearch (html) {
    const $ = cheerio.load(html)
    const boxs = $('.hy-layout .hy-video-details').get()
    const res = boxs.map(o => {
      var urlReg = /.+url\((.+)\)/
      var reReg = /(.+)：/
      const getText = (text, type) => {
        let t = text ? text.replace(reReg, '') : ''
        if (type) return t
        return t ? t.split(',') : []
      }
      const getLi = n => $(o).find('dd ul li').eq(n).text()
      return {
        img: urlReg.test($(o).find('.videopic').attr('style')) ? RegExp.$1 : '',
        title: $(o).find('.head h3').html(),
        actors: getText(
          $(o).find('.one').text()
        ),
        directors: getText(getLi(1)),
        area: getText(getLi(2), 1),
        year: getText(getLi(3), 1),
        intro: getText(getLi(4), 1),
        href: ONLINE + $(o).find('.block a').attr('href').replace(/\//, '')
      }
    })
    return res
  }

  async _readFile (num) {
    const file = await promisify(fs.readFile)(resolve(__dirname, `../movie/movie(${num}).html`))
    return file
  }
}
export default Crawler
