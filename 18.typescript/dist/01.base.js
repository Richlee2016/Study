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
let objany = {
    a: 1,
    b: 2
};
console.log('any obj', objany.a, objany.b);
let objinter = {
    a: 3,
    b: 4,
    c: 'rich'
};
console.log('interface obj', objinter.a, objinter.b);
// 解构
let sayName = ([a, b]) => {
    console.log(a, b);
};
sayName(['rich', 1]);
let sayAge = ({ a, b }) => {
    console.log(a, b);
};
sayAge({ a: 'rich', b: 28 });
// 解构的默认值
let goHome = ({ a = 'rich', b = 2 }) => {
    console.log(a, b);
};
goHome({ a: 'lee' });
let go1 = {
    a: 1,
    // b:'nice',
    gogo: 'nice',
    jiu: 'yo'
};
let in2 = [1, 2, 3];
let in3 = ['rich', 'lee'];
let in1 = { len: 1, go: 2 };
// 
let square = {};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
console.log(square);
