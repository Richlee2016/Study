"use strict";
//接口扩展：接口可以继承接口   
var Programmer = /** @class */ (function () {
    function Programmer(name) {
        this.name = name;
    }
    Programmer.prototype.coding = function (code) {
        console.log(this.name + code);
    };
    return Programmer;
}());
// class Web extends Programmer implements Person{
//     constructor(name:string){
//        super(name)
//     }
//     eat(){
//         console.log(this.name+'喜欢吃馒头')
//     }
//     work(){
//         console.log(this.name+'写代码');
//     }
// }
// var w=new Web('小李');
// // w.eat();
// w.coding('写ts代码');
