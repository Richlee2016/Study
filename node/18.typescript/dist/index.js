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
// class  extend  super
sd;
var Person = /** @class */ (function () {
    function Person(n) {
        this.name = n;
    }
    Person.prototype.sayName = function () {
        console.log(this.name);
    };
    return Person;
}());
var Rich = /** @class */ (function (_super) {
    __extends(Rich, _super);
    function Rich(name) {
        return _super.call(this, name) || this;
    }
    return Rich;
}(Person));
