/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _querystring = __webpack_require__(2);

	var _querystring2 = _interopRequireDefault(_querystring);

	var _utils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(function () {
	  $.Grid();
	  $.IsLogin();
	  $.Login();
	  $.LoginOut();
	});

	$.extend($, {
	  IsLogin: function IsLogin() {
	    var info = Cookies.getJSON('userInfo');
	    if (info && Object.keys(info).length) {
	      var cover = info.cover,
	          _name = info.name;

	      $('#UserBox').show();
	      $('#UserBox img').attr('src', cover);
	      $('#UserBox p').html(_name);
	      $('#Login').hide();
	    } else {
	      $('#Login').show();
	    };
	  },
	  Login: function Login() {
	    $('#Login').click(function () {
	      var sendData = {
	        response_type: 'code',
	        client_id: 101435375,
	        redirect_uri: encodeURI('http://173gg43187.iok.la/oauth/qq'),
	        state: 'http://localhost:8080/'
	      };
	      var href = 'https://graph.qq.com/oauth2.0/authorize?' + _querystring2.default.stringify(sendData);
	      location.href = href;
	      // window.open(href,null, 'height=600, width=600, top=100, left=100');
	    });
	  },
	  LoginOut: function LoginOut() {
	    $('#Quit').click(function () {
	      $.get('/oauth/logout', function (data) {
	        console.log(data);
	        if (data.status === 1) {
	          Cookies.remove('userInfo');
	          window.location.reload();
	        }
	      });
	    });
	  },
	  Grid: function Grid() {
	    $('#Grim>li').each(function (i, o) {
	      $(o).css((0, _utils.setGrim)(i + 1));
	    });
	  },

	  //   banner 切换
	  Banner: function Banner() {
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
	    });
	    console.log(321);
	  },

	  // Online 切换
	  Online: function Online(name) {
	    var html = '';
	    $.get('/Online/Search?wd=' + name, function (data) {
	      data.forEach(function (o) {
	        html += '<div class="swiper-slide movie-box">\n        <a href="' + o.href + '" target="view_window">\n          <img src="' + o.img + '" />\n          <span class="black-block">' + (o.year || '') + '</span>\n          <span class="black-block">' + (o.area || '') + '</span>\n          <p class="black-block">' + (o.title || '') + '</p>\n        </a>\n    </div>';
	      });
	      $('#OnlineSwiper').html(html);

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
	        });
	      } else {
	        $('.movie-box').css({ marginRight: '10px' });
	        $('.swiper-button-prev').hide();
	        $('.swiper-button-next').hide();
	      }
	    });
	  },

	  //   切换封装
	  _ChanBlock: function _ChanBlock(nav, block) {
	    var num = void 0;
	    var showBlock = function showBlock(i) {
	      nav.find('li font').hide();
	      nav.find('li font').eq(i).show();
	      nav.find('li').removeClass('active');
	      nav.find('li').eq(i).addClass('active');
	      num = i;
	      var start = i * 10;
	      var end = (i + 1) * 10;
	      block.find('li').hide();
	      block.find('li').each(function (i, o) {
	        if (i >= start && i < end) {
	          $(o).fadeIn(400);
	        }
	      });
	    };
	    showBlock(0);
	    nav.find('li').each(function (i, o) {
	      $(o).mouseover(function () {
	        if (num !== i) {
	          showBlock(i);
	        }
	      });
	    });
	  },

	  //   切换
	  ChanBlock: function ChanBlock() {
	    var _this = this;

	    var nav = $('.m-block .left-title >ul');
	    var block = $('.m-block .left-block');

	    var rNav = $('.m-block .right .r-head');
	    var rBlock = $('.m-block .right .r-list');

	    var goChan = function goChan(nav, block) {
	      nav.each(function (i, o) {
	        _this._ChanBlock($(o), block.eq(i));
	      });
	    };
	    goChan(nav, block);
	    goChan(rNav, rBlock);
	  },

	  // 电影筛选
	  MovieType: function MovieType() {
	    var query = /\?(.+)/.test(location.search) ? _querystring2.default.parse(RegExp.$1) : {};
	    if (query.w) delete query.w;
	    delete query.w;
	    var aDl = $('.l-menu dl');
	    // $(".m-menu").hide();
	    aDl.each(function (n, dl) {
	      var type = $(dl).data('type');
	      if (!query[type]) {
	        $(dl).find('dd a').eq(0).addClass('active');
	      }

	      $(dl).find('dd').each(function (m, dd) {
	        var na = function na() {
	          return $(dd).find('a').html();
	        };
	        if (query[type] && query[type] === na()) {
	          $(dd).find('a').addClass('active');
	        }
	        $(dd).click(function () {
	          name = na();
	          if (query[type] === name) return;
	          query[type] = name;
	          if (name == '全部') {
	            delete query[type];
	          }
	          window.location.href = '/list?' + _querystring2.default.stringify(query);
	        });
	      });
	    });
	  },

	  // 分组swiper
	  GroupSwiper: function GroupSwiper() {
	    $('.swiper-online').each(function (i, group) {
	      new Swiper('.s-group' + i, {
	        loop: true,
	        slidesPerView: 4,
	        spaceBetween: 22,
	        navigation: {
	          nextEl: '.online-next' + i,
	          prevEl: '.online-prev' + i
	        }
	      });
	    });
	  },

	  // 分页封装
	  PageGo: function PageGo(current, pageCount, cb) {
	    $('.M-box').pagination({
	      current: current,
	      pageCount: pageCount,
	      coping: true,
	      isHide: true,
	      count: 1,
	      jump: true,
	      homePage: '首页',
	      prevContent: '上一页',
	      nextContent: '下一页',
	      callback: function callback(api) {
	        var page = api.getCurrent();
	        cb && cb(page);
	      }
	    });
	  },
	  ListPage: function ListPage(total) {
	    var all = Math.ceil(total / 24);
	    var query = $.utils.hrefParse();
	    $.PageGo(1, all, function (page) {
	      query.page = page;
	      query.size = 24;
	      var goHref = $.utils.qs.stringify(query);
	      $.get('/Movie/GetMovieList?' + goHref, function (data) {
	        var list = data.movies.list;
	        var html = list.reduce(function (h, item) {
	          h = h + ('\n              <li class="movie-box vivify animationObject popInTop">\n                  <a href="/vod/' + item._id + '">\n                      <img src="http://go.richfly.cn/' + item.cover + '" />\n                      <span class="black-block">' + item.year + '</span>\n                      <span class="black-block">9</span>\n                      <p class="black-block">' + item.name + '</p>\n                  </a>\n              </li>\n              ');
	          return h;
	        }, '');
	        $('.l-list').html(html);
	      });
	    });
	  },

	  utils: {
	    qs: _querystring2.default,
	    hrefParse: function hrefParse() {
	      var href = location.href;
	      var str = /\?(.+)#/.test(href) ? RegExp.$1 : {};
	      return _querystring2.default.parse(str);
	    }
	  }
	});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(3);
	exports.encode = exports.stringify = __webpack_require__(4);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function (qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr,
	        vstr,
	        k,
	        v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var stringifyPrimitive = function stringifyPrimitive(v) {
	  switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function (obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	    return Object.keys(obj).map(function (k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function (v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var setGrim = exports.setGrim = function setGrim(n) {
	  n = n === 10 ? 9 : n;
	  var w = n % 2 === 1 ? (n + 1) / 2 : n / 2;
	  var h = n % 2 === 1 ? (n - 1) / 2 : n / 2;
	  var mathM = function mathM(t, s) {
	    var i = 0;

	    var r = 100;
	    while (i < t) {
	      r = r / 2;
	      i++;
	    }
	    return r;
	  };
	  return {
	    width: mathM(w) + '%',
	    height: mathM(h) + '%'
	  };
	};

/***/ })
/******/ ]);