/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/js/common.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/js/common.js":
/*!**************************!*\
  !*** ./app/js/common.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _querystring = __webpack_require__(/*! querystring */ \"./node_modules/.0.2.1@querystring-es3/index.js\");\n\nvar _querystring2 = _interopRequireDefault(_querystring);\n\nvar _utils = __webpack_require__(/*! ../plugin/utils */ \"./app/plugin/utils.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n$(function () {\n  $.Grid();\n});\n\n$.extend($, {\n  Grid: function Grid() {\n    $(\"#Grim>li\").each(function (i, o) {\n      $(o).css((0, _utils.setGrim)(i + 1));\n    });\n  },\n\n  //   banner 切换\n  Banner: function Banner() {\n    var mySwiper = new Swiper(\".swiper-banner\", {\n      autoplay: 3000,\n      loop: true,\n      pagination: {\n        el: \".banner-page\"\n      },\n      navigation: {\n        nextEl: \".banner-next\",\n        prevEl: \".banner-prev\"\n      }\n    });\n  },\n\n  // Online 切换\n  Online: function Online(name) {\n    var html = \"\";\n    $.get(\"/Online/Search?wd=\" + name, function (data) {\n      data.forEach(function (o) {\n        html += \"<div class=\\\"swiper-slide movie-box\\\">\\n        <a href=\\\"\" + o.href + \"\\\" target=\\\"view_window\\\">\\n          <img src=\\\"\" + o.img + \"\\\" />\\n          <span class=\\\"black-block\\\">\" + (o.year || \"\") + \"</span>\\n          <span class=\\\"black-block\\\">\" + (o.area || \"\") + \"</span>\\n          <p class=\\\"black-block\\\">\" + (o.title || \"\") + \"</p>\\n        </a>\\n    </div>\";\n      });\n      $(\"#OnlineSwiper\").html(html);\n\n      if (data.length > 6) {\n        var mySwiper = new Swiper(\".swiper-online\", {\n          loop: true,\n          slidesPerView: 6,\n          spaceBetween: 20,\n          pagination: {\n            el: \".online-page\"\n          },\n          navigation: {\n            nextEl: \".online-next\",\n            prevEl: \".online-prev\"\n          }\n        });\n      } else {\n        $(\".movie-box\").css({ marginRight: \"10px\" });\n        $(\".swiper-button-prev\").hide();\n        $(\".swiper-button-next\").hide();\n      }\n    });\n  },\n\n  //   切换封装\n  _ChanBlock: function _ChanBlock(nav, block) {\n    var num = void 0;\n    var showBlock = function showBlock(i) {\n      num = i;\n      var start = i * 10;\n      var end = (i + 1) * 10;\n      block.find(\"li\").hide();\n      block.find(\"li\").each(function (i, o) {\n        if (i >= start && i < end) {\n          $(o).fadeIn(400);\n        }\n      });\n    };\n    showBlock(0);\n    nav.find(\"li\").each(function (i, o) {\n      $(o).mouseover(function () {\n        if (num !== i) {\n          showBlock(i);\n        }\n      });\n    });\n  },\n\n  //   切换\n  ChanBlock: function ChanBlock() {\n    var _this = this;\n\n    var nav = $(\".m-block .title >ul\");\n    var block = $(\".m-block .left >ul\");\n\n    var rNav = $(\".m-block .right .r-title\");\n    var rBlock = $(\".m-block .right .r-list\");\n\n    var goChan = function goChan(nav, block) {\n      nav.each(function (i, o) {\n        _this._ChanBlock($(o), block.eq(i));\n      });\n    };\n    goChan(nav, block);\n    goChan(rNav, rBlock);\n  },\n\n  //电影筛选\n  MovieType: function MovieType() {\n    var types = [];\n    var query = /\\?(.+)/.test(location.search) ? _querystring2.default.parse(RegExp.$1) : {};\n    if (query.w) delete query.w;\n    delete query.w;\n    var aDl = $(\".l-menu dl\");\n    // $(\".m-menu\").hide();\n    aDl.each(function (n, dl) {\n      var type = $(dl).data(\"type\");\n      if (!query[type]) {\n        $(dl).find(\"dd a\").eq(0).addClass(\"active\");\n      }\n\n      $(dl).find(\"dd\").each(function (m, dd) {\n        var na = function na() {\n          return $(dd).find(\"a\").html();\n        };\n        if (query[type] && query[type] == na()) {\n          $(dd).find(\"a\").addClass(\"active\");\n        }\n        $(dd).click(function () {\n          name = na();\n          if (query[type] === name) return;\n          query[type] = name;\n          if (name == \"全部\") {\n            delete query[type];\n          }\n          location.href = \"/list?\" + _querystring2.default.stringify(query);\n        });\n      });\n    });\n  },\n\n  // 分组swiper\n  GroupSwiper: function GroupSwiper() {\n    $(\".swiper-online\").each(function (i, group) {\n      console.log(i);\n      var mySwiper = new Swiper(\".s-group\" + i, {\n        loop: true,\n        slidesPerView: 4,\n        spaceBetween: 22,\n        navigation: {\n          nextEl: \".online-next\" + i,\n          prevEl: \".online-prev\" + i\n        }\n      });\n    });\n  },\n\n  utils: {\n    qs: _querystring2.default\n  }\n});\n\n//# sourceURL=webpack:///./app/js/common.js?");

/***/ }),

/***/ "./app/plugin/utils.js":
/*!*****************************!*\
  !*** ./app/plugin/utils.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar setGrim = exports.setGrim = function setGrim(n) {\n  n = n === 10 ? 9 : n;\n  var w = n % 2 === 1 ? (n + 1) / 2 : n / 2;\n  var h = n % 2 === 1 ? (n - 1) / 2 : n / 2;\n  var mathM = function mathM(t, s) {\n    var i = 0,\n        r = 100;\n    while (i < t) {\n      r = r / 2;\n      i++;\n    }\n    return r;\n  };\n  return {\n    width: mathM(w) + \"%\",\n    height: mathM(h) + \"%\"\n  };\n};\n\n//# sourceURL=webpack:///./app/plugin/utils.js?");

/***/ }),

/***/ "./node_modules/.0.2.1@querystring-es3/decode.js":
/*!*******************************************************!*\
  !*** ./node_modules/.0.2.1@querystring-es3/decode.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\n// If obj.hasOwnProperty has been overridden, then calling\n// obj.hasOwnProperty(prop) will break.\n// See: https://github.com/joyent/node/issues/1707\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\nmodule.exports = function(qs, sep, eq, options) {\n  sep = sep || '&';\n  eq = eq || '=';\n  var obj = {};\n\n  if (typeof qs !== 'string' || qs.length === 0) {\n    return obj;\n  }\n\n  var regexp = /\\+/g;\n  qs = qs.split(sep);\n\n  var maxKeys = 1000;\n  if (options && typeof options.maxKeys === 'number') {\n    maxKeys = options.maxKeys;\n  }\n\n  var len = qs.length;\n  // maxKeys <= 0 means that we should not limit keys count\n  if (maxKeys > 0 && len > maxKeys) {\n    len = maxKeys;\n  }\n\n  for (var i = 0; i < len; ++i) {\n    var x = qs[i].replace(regexp, '%20'),\n        idx = x.indexOf(eq),\n        kstr, vstr, k, v;\n\n    if (idx >= 0) {\n      kstr = x.substr(0, idx);\n      vstr = x.substr(idx + 1);\n    } else {\n      kstr = x;\n      vstr = '';\n    }\n\n    k = decodeURIComponent(kstr);\n    v = decodeURIComponent(vstr);\n\n    if (!hasOwnProperty(obj, k)) {\n      obj[k] = v;\n    } else if (isArray(obj[k])) {\n      obj[k].push(v);\n    } else {\n      obj[k] = [obj[k], v];\n    }\n  }\n\n  return obj;\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\n\n//# sourceURL=webpack:///./node_modules/.0.2.1@querystring-es3/decode.js?");

/***/ }),

/***/ "./node_modules/.0.2.1@querystring-es3/encode.js":
/*!*******************************************************!*\
  !*** ./node_modules/.0.2.1@querystring-es3/encode.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar stringifyPrimitive = function(v) {\n  switch (typeof v) {\n    case 'string':\n      return v;\n\n    case 'boolean':\n      return v ? 'true' : 'false';\n\n    case 'number':\n      return isFinite(v) ? v : '';\n\n    default:\n      return '';\n  }\n};\n\nmodule.exports = function(obj, sep, eq, name) {\n  sep = sep || '&';\n  eq = eq || '=';\n  if (obj === null) {\n    obj = undefined;\n  }\n\n  if (typeof obj === 'object') {\n    return map(objectKeys(obj), function(k) {\n      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;\n      if (isArray(obj[k])) {\n        return map(obj[k], function(v) {\n          return ks + encodeURIComponent(stringifyPrimitive(v));\n        }).join(sep);\n      } else {\n        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));\n      }\n    }).join(sep);\n\n  }\n\n  if (!name) return '';\n  return encodeURIComponent(stringifyPrimitive(name)) + eq +\n         encodeURIComponent(stringifyPrimitive(obj));\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\nfunction map (xs, f) {\n  if (xs.map) return xs.map(f);\n  var res = [];\n  for (var i = 0; i < xs.length; i++) {\n    res.push(f(xs[i], i));\n  }\n  return res;\n}\n\nvar objectKeys = Object.keys || function (obj) {\n  var res = [];\n  for (var key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);\n  }\n  return res;\n};\n\n\n//# sourceURL=webpack:///./node_modules/.0.2.1@querystring-es3/encode.js?");

/***/ }),

/***/ "./node_modules/.0.2.1@querystring-es3/index.js":
/*!******************************************************!*\
  !*** ./node_modules/.0.2.1@querystring-es3/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.decode = exports.parse = __webpack_require__(/*! ./decode */ \"./node_modules/.0.2.1@querystring-es3/decode.js\");\nexports.encode = exports.stringify = __webpack_require__(/*! ./encode */ \"./node_modules/.0.2.1@querystring-es3/encode.js\");\n\n\n//# sourceURL=webpack:///./node_modules/.0.2.1@querystring-es3/index.js?");

/***/ })

/******/ });