import qs from "querystring";

$(function() {
  $.Grid();
});

import { setGrim } from "../plugin/utils";

$.extend($, {
  Grid() {
    $("#Grim>li").each(function(i, o) {
      $(o).css(setGrim(i + 1));
    });
  },
  //   banner 切换
  Banner() {
    var mySwiper = new Swiper(".swiper-banner", {
      autoplay: 3000,
      loop: true,
      pagination: {
        el: ".banner-page"
      },
      navigation: {
        nextEl: ".banner-next",
        prevEl: ".banner-prev"
      }
    });
  },
  // Online 切换
  Online(name) {
    let html = "";
    $.get(`/Online/Search?wd=${name}`, data => {
      data.forEach(o => {
        html += `<div class="swiper-slide movie-box">
        <a href="${o.href}" target="view_window">
          <img src="${o.img}" />
          <span class="black-block">${o.year || ""}</span>
          <span class="black-block">${o.area || ""}</span>
          <p class="black-block">${o.title || ""}</p>
        </a>
    </div>`;
      });
      $("#OnlineSwiper").html(html);

      if (data.length > 6) {
        var mySwiper = new Swiper(".swiper-online", {
          loop: true,
          slidesPerView: 6,
          spaceBetween: 20,
          pagination: {
            el: ".online-page"
          },
          navigation: {
            nextEl: ".online-next",
            prevEl: ".online-prev"
          }
        });
      } else {
        $(".movie-box").css({ marginRight: "10px" });
        $(".swiper-button-prev").hide();
        $(".swiper-button-next").hide();
      }
    });
  },
  //   切换封装
  _ChanBlock(nav, block) {
    let num;
    const showBlock = i => {
      num = i;
      let start = i * 10;
      let end = (i + 1) * 10;
      block.find("li").hide();
      block.find("li").each((i, o) => {
        if (i >= start && i < end) {
          $(o).fadeIn(400);
        }
      });
    };
    showBlock(0);
    nav.find("li").each((i, o) => {
      $(o).mouseover(() => {
        if (num !== i) {
          showBlock(i);
        }
      });
    });
  },
  //   切换
  ChanBlock() {
    const nav = $(".m-block .title >ul");
    const block = $(".m-block .left >ul");

    const rNav = $(".m-block .right .r-title");
    const rBlock = $(".m-block .right .r-list");

    const goChan = (nav, block) => {
      nav.each((i, o) => {
        this._ChanBlock($(o), block.eq(i));
      });
    };
    goChan(nav, block);
    goChan(rNav, rBlock);
  },
  //电影筛选
  MovieType() {
    let types = [];
    let query = /\?(.+)/.test(location.search) ? qs.parse(RegExp.$1) : {};
    if(query.w) delete query.w;
    delete query.w
    const aDl = $(".l-menu dl");
    // $(".m-menu").hide();
    aDl.each((n, dl) => {
      const type = $(dl).data("type");
      if (!query[type]) {
        $(dl)
          .find("dd a")
          .eq(0)
          .addClass("active");
      }

      $(dl)
        .find("dd")
        .each((m, dd) => {
          let na = () =>
            $(dd)
              .find("a")
              .html();
          if (query[type] && query[type] == na()) {
            $(dd)
              .find("a")
              .addClass("active");
          }
          $(dd).click(() => {
            name = na();
            if (query[type] === name) return;
            query[type] = name;
            if (name == "全部") {
              delete query[type];
            }
            location.href = `/list?${qs.stringify(query)}`;
          });
        });
    });
  },
  // 分组swiper
  GroupSwiper() {
    $(".swiper-online").each((i, group) => {
      console.log(i);
      var mySwiper = new Swiper(`.s-group${i}`, {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 22,
        navigation: {
          nextEl: `.online-next${i}`,
          prevEl: `.online-prev${i}`
        }
      });
    });
  },
  utils: {
    qs
  }
});
