"use strict";
/*
高级类型

this类型
索引类型
映射类型
条件类型
*/
// type  与  interface
// 需要扩展的时候  使用  extends   使用interface
// 需要用到元组 的时候使用 type
const box = { age: 1, name: 321, Child: { age: 1, name: 3 } };
const name1 = "rich";
const age = 18;
const people = {
    name: "rich",
    age: 18
};
function assetNever(value) {
    throw new Error("fuck" + value);
}
function getArea(s) {
    switch (s.kind) {
        case "square":
            console.log("square");
            return s.size;
            break;
        case "rectangle":
            console.log("rectangle");
            return s.height;
            break;
        case "circle":
            console.log("circle");
            return s.radius;
            break;
    }
}
/** this 类型 */
class Counter {
    constructor(count = 0) {
        this.count = count;
    }
    add(value) {
        this.count += value;
        return this;
    }
    subtract(value) {
        this.count -= value;
        return this;
    }
}
let con = new Counter(10);
con.add(1).subtract(2); //返回 this  产生链式调用
class Mathgo extends Counter {
    constructor(count = 0) {
        super(count);
        this.count = count;
    }
    pow(value) {
        this.count = Math.pow(this.count, value);
        return this;
    }
}
let newcon = new Mathgo(3);
newcon
    .pow(3)
    .add(1)
    .subtract(4);
// key 的索引 类型
let infoprop;
infoprop = "name";
infoprop = "age";
function getValue(obj, names) {
    return names.map(n => obj[n]);
}
getValue({ name: "rich", age: 1 }, ["name", "age"]);
const rich1 = "rich";
let keys = 10; //数字是会转成 string的
let nkey = "nice";
const a1 = {
    age: 321
};
const a2 = 321;
const pick22 = {
    age: { age: 1, nice: "rich" },
    name: "rich",
    year: 321
};
let pickstr = { age: { age: 123, nice: "nice" } };
function pick(obj, keys) {
    const res = [];
    keys.map(key => {
        res[key] = obj[key];
    });
    return res;
}
pick(pick22, ["age", "name"]);
function proxify(obj) {
    let res = {};
    for (const key in obj) {
        res[key] = {
            get: () => obj[key],
            set: value => (obj[key] = value)
        };
    }
    return res;
}
let pro = {
    name: "rich",
    age: 6
};
let proxyPros = proxify(pro);
// 拆包
function unproxy(t) {
    let res = {};
    for (const key in t) {
        res[key] = t[key].get();
    }
    return res;
}
/** keyof 2.9的升级 */
const str0 = "a";
const str1 = 1;
const sm = Symbol();
// unknown  3.0 升级的 顶级类型
// [1] 任何类型都可以赋值给 unknown类型
let val;
val = 321;
// [2] 如果没有类型断言或基于控制流的类型细化时、unknown不可以赋值给其他类型，此时他只能赋值给unknown和any类型
let val1;
// let val2:string = val1
val1 = val;
// [3]如果没有类型断言或基于控制流的类型细化时、不能再他上面进行任何操作
let val4;
let index;
// InstanceType<T>
class Aclass {
    constructor() { }
}
