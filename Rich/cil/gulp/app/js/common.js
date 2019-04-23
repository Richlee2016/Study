import qs from 'querystring'

import { setGrim } from './utils'
$(function () {
  $.Grid()
  $.IsLogin()
  $.Login()
  $.LoginOut()
})

$.extend($, {
  IsLogin () {
    const info = Cookies.getJSON('userInfo')
    if (info && Object.keys(info).length) {
      const { cover, name } = info
      $('#UserBox').show()
      $('#UserBox img').attr('src', cover)
      $('#UserBox p').html(name)
      $('#Login').hide()
    }else{
      $('#Login').show()
    };
  },
  Login () {
    $('#Login').click(function () {
      const sendData = {
        response_type: 'code',
        client_id: 101435375,
        redirect_uri: encodeURI('http://173gg43187.iok.la/oauth/qq'),
        state: 'http://localhost:8080/'
      }
      const href = `https://graph.qq.com/oauth2.0/authorize?${qs.stringify(
        sendData
      )}`
      location.href = href
      // window.open(href,null, 'height=600, width=600, top=100, left=100');
    })
  },
  LoginOut () {
    $('#Quit').click(function () {
      $.get('/oauth/logout', function (data) {
        console.log(data)
        if (data.status === 1) {
          Cookies.remove('userInfo')
          window.location.reload()
        }
      })
    })
  },
  Grid () {
    $('#Grim>li').each(function (i, o) {
      $(o).css(setGrim(i + 1))
    })
  },
  //   banner 切换
  Banner () {
    new Swiper('.swiper-banner', {
      autoplay: 3000,
      loop: true,
      pagination: {
        el: '.banner-page'
      },
      navigation: {
        nextEl: '.banner-next',
        prevEl: '.banner-prev'
      }
    })
    console.log(321);
  },
  // Online 切换
  Online (name) {
    let html = ''
    $.get(`/Online/Search?wd=${name}`, data => {
      data.forEach(o => {
        html += `<div class="swiper-slide movie-box">
        <a href="${o.href}" target="view_window">
          <img src="${o.img}" />
          <span class="black-block">${o.year || ''}</span>
          <span class="black-block">${o.area || ''}</span>
          <p class="black-block">${o.title || ''}</p>
        </a>
    </div>`
      })
      $('#OnlineSwiper').html(html)

      if (data.length > 6) {
        new Swiper('.swiper-online', {
          loop: true,
          slidesPerView: 6,
          spaceBetween: 20,
          pagination: {
            el: '.online-page'
          },
          navigation: {
            nextEl: '.online-next',
            prevEl: '.online-prev'
          }
        })
      } else {
        $('.movie-box').css({ marginRight: '10px' })
        $('.swiper-button-prev').hide()
        $('.swiper-button-next').hide()
      }
    })
  },
  //   切换封装
  _ChanBlock (nav, block) {
    let num
    const showBlock = i => {
      nav.find('li font').hide()
      nav.find('li font').eq(i).show()
      nav.find('li').removeClass('active')
      nav.find('li').eq(i).addClass('active')
      num = i
      let start = i * 10
      let end = (i + 1) * 10
      block.find('li').hide()
      block.find('li').each((i, o) => {
        if (i >= start && i < end) {
          $(o).fadeIn(400)
        }
      })
    }
    showBlock(0)
    nav.find('li').each((i, o) => {
      $(o).mouseover(() => {
        if (num !== i) {
          showBlock(i)
        }
      })
    })
  },
  //   切换
  ChanBlock () {
    const nav = $('.m-block .left-title >ul')
    const block = $('.m-block .left-block')

    const rNav = $('.m-block .right .r-head')
    const rBlock = $('.m-block .right .r-list')

    const goChan = (nav, block) => {
      nav.each((i, o) => {
        this._ChanBlock($(o), block.eq(i))
      })
    }
    goChan(nav, block)
    goChan(rNav, rBlock)
  },
  // 电影筛选
  MovieType () {
    let query = /\?(.+)/.test(location.search) ? qs.parse(RegExp.$1) : {}
    if (query.w) delete query.w
    delete query.w
    const aDl = $('.l-menu dl')
    // $(".m-menu").hide();
    aDl.each((n, dl) => {
      const type = $(dl).data('type')
      if (!query[type]) {
        $(dl)
          .find('dd a')
          .eq(0)
          .addClass('active')
      }

      $(dl)
        .find('dd')
        .each((m, dd) => {
          let na = () =>
            $(dd)
              .find('a')
              .html()
          if (query[type] && query[type] === na()) {
            $(dd)
              .find('a')
              .addClass('active')
          }
          $(dd).click(() => {
            name = na()
            if (query[type] === name) return
            query[type] = name
            if (name == '全部') {
              delete query[type]
            }
            window.location.href = `/list?${qs.stringify(query)}`
          })
        })
    })
  },
  // 分组swiper
  GroupSwiper () {
    $('.swiper-online').each((i, group) => {
      new Swiper(`.s-group${i}`, {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 22,
        navigation: {
          nextEl: `.online-next${i}`,
          prevEl: `.online-prev${i}`
        }
      })
    })
  },
  // 分页封装
  PageGo (current, pageCount, cb) {
    $('.M-box').pagination({
      current,
      pageCount,
      coping: true,
      isHide: true,
      count: 1,
      jump: true,
      homePage: '首页',
      prevContent: '上一页',
      nextContent: '下一页',
      callback: function (api) {
        let page = api.getCurrent()
        cb && cb(page)
      }
    })
  },
  ListPage (total) {
    let all = Math.ceil(total / 24)
    let query = $.utils.hrefParse()
    $.PageGo(1, all, function (page) {
      query.page = page
      query.size = 24
      var goHref = $.utils.qs.stringify(query)
      $.get('/Movie/GetMovieList?' + goHref, function (data) {
        var list = data.movies.list
        let html = list.reduce((h, item) => {
          h = h + `
              <li class="movie-box vivify animationObject popInTop">
                  <a href="/vod/${item._id}">
                      <img src="http://go.richfly.cn/${item.cover}" />
                      <span class="black-block">${item.year}</span>
                      <span class="black-block">9</span>
                      <p class="black-block">${item.name}</p>
                  </a>
              </li>
              `
          return h
        }, '')
        $('.l-list').html(html)
      })
    })
  },
  utils: {
    qs,
    hrefParse () {
      let href = location.href
      let str = /\?(.+)#/.test(href) ? RegExp.$1 : {}
      return qs.parse(str)
    }
  }
})
