"use strict";
// 可索引接口：数组、对象的约束  （不常用）
// implements 实现接口
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.eat = function () {
        console.log(this.name + '吃粮食');
    };
    return Dog;
}());
var d = new Dog('小黑');
d.eat();
var Cat = /** @class */ (function () {
    function Cat(name) {
        this.name = name;
    }
    Cat.prototype.eat = function () {
        console.log(this.name + '吃');
    };
    return Cat;
}());
var c = new Cat('小花');
// c.eat('老鼠');
