"use strict";
// 可索引接口：数组、对象的约束  （不常用）
// implements 实现接口
class Dog {
    constructor(name) {
        this.name = name;
    }
    eat() {
        console.log(this.name + '吃粮食');
    }
}
var d = new Dog('小黑');
d.eat();
class Cat {
    constructor(name) {
        this.name = name;
    }
    eat() {
        console.log(this.name + '吃');
    }
}
var c = new Cat('小花');
// c.eat('老鼠');
