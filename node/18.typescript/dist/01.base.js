"use strict";
/**
 * boolean
 * number
 * string
 * object
 * array
 * {
 * number[]
 * Array<number>
 * ReadonlyArray<number> 不可改变的数组
 * }
 * 元组 let x:[string,number]  x=['riche',28]  x[0]
 * enum 枚举
 * any
 * void
 * null
 * undefined
 * never
 * 断言
 * {
 * let a:any = 'rich
 * let len:number = (<string>a).length
 * 或者 let len:number = (a as string).length
 * }
 *
 */
var objany = {
    a: 1,
    b: 2
};
console.log('any obj', objany.a, objany.b);
var objinter = {
    a: 3,
    b: 4,
    c: 'rich'
};
console.log('interface obj', objinter.a, objinter.b);
// 解构
var sayName = function (_a) {
    var a = _a[0], b = _a[1];
    console.log(a, b);
};
sayName(['rich', 1]);
var sayAge = function (_a) {
    var a = _a.a, b = _a.b;
    console.log(a, b);
};
sayAge({ a: 'rich', b: 28 });
// 解构的默认值
var goHome = function (_a) {
    var _b = _a.a, a = _b === void 0 ? 'rich' : _b, _c = _a.b, b = _c === void 0 ? 2 : _c;
    console.log(a, b);
};
goHome({ a: 'lee' });
var go1 = {
    a: 1,
    // b:'nice',
    gogo: 'nice',
    jiu: 'yo'
};
var in2 = [1, 2, 3];
var in3 = ['rich', 'lee'];
var in1 = { len: 1, go: 2 };
// 
var square = {};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
console.log(square);
