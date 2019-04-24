"use strict";
// 属性 与 方法 的种类
class Person {
    constructor(name, age, money) {
        this.name = name;
        this.age = age;
        this.money = money;
    }
}
Person.nice = 'richlee';
class Rich extends Person {
    constructor(name, age, money) {
        super(name, age, money);
    }
    sayAge() {
        console.log(this.age);
    }
}
let rich = new Rich('richlee', 26, 1001000);
console.log(Rich.nice);
// 类的 get set 方法
let passcode = "secret passcode";
class Employee {
    constructor() {
        this._fullName = "";
    }
    get fullName() {
        return this._fullName;
    }
    set fullName(newName) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
// 抽象类  不同于接口，抽象类可以包含成员的实现细节
class Box {
    asyage(age) {
        console.log(age);
    }
}
class Club extends Box {
    constructor() {
        super(...arguments);
        this.color = 'red';
    }
    sayName(name) {
        console.log(name, this.color);
    }
}
let club = new Club();
club.sayName('club box');
