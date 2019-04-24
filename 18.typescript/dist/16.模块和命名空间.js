"use strict";
// 命名空间
/**
 * 工具库  模块
 * 防止全局污染 命名空间
 */
/// <reference path='./modlue/space.ts'>
/// <reference path='./modlue/ospace.ts'>
let isletter = MySpace.age;
let gogo = MySpace.go;
var Shapes;
(function (Shapes) {
    let Pay;
    (function (Pay) {
        Pay.nice = 'good';
    })(Pay = Shapes.Pay || (Shapes.Pay = {}));
})(Shapes || (Shapes = {}));
var pay = Shapes.Pay;
const nice = pay.nice;
