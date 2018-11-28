"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 属性 与 方法 的种类
var Person = /** @class */ (function () {
    function Person(name, age, money) {
        this.name = name;
        this.age = age;
        this.money = money;
    }
    Person.nice = 'richlee';
    return Person;
}());
var Rich = /** @class */ (function (_super) {
    __extends(Rich, _super);
    function Rich(name, age, money) {
        return _super.call(this, name, age, money) || this;
    }
    Rich.prototype.sayAge = function () {
        console.log(this.age);
    };
    return Rich;
}(Person));
var rich = new Rich('richlee', 26, 1001000);
console.log(Rich.nice);
// 类的 get set 方法
var passcode = "secret passcode";
var Employee = /** @class */ (function () {
    function Employee() {
        this._fullName = "";
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode == "secret passcode") {
                this._fullName = newName;
            }
            else {
                console.log("Error: Unauthorized update of employee!");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
var employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
// 抽象类  不同于接口，抽象类可以包含成员的实现细节
var Box = /** @class */ (function () {
    function Box() {
    }
    Box.prototype.asyage = function (age) {
        console.log(age);
    };
    return Box;
}());
var Club = /** @class */ (function (_super) {
    __extends(Club, _super);
    function Club() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color = 'red';
        return _this;
    }
    Club.prototype.sayName = function (name) {
        console.log(name, this.color);
    };
    return Club;
}(Box));
var club = new Club();
club.sayName('club box');
