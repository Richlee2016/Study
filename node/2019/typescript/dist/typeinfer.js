"use strict";
// 类型推导
var nice = "list";
var arr = [1, "321"];
// 上下文类型  左边 推导 右边
window.onmousedown = function (e) {
    console.log(e);
};
var infos;
var b = { name: "listen" };
var c = { name: 18 };
var a = { name: "listen", age: 18 };
