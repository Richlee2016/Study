"use strict";
/*

泛型：软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。


通俗理解：泛型就是解决 类 接口 方法的复用性、以及对不特定数据类型的支持(类型校验)

*/
//只能返回string类型的数据
// function getData(value:string):string{
//     return value;
// }
//同时返回 string类型 和number类型  （代码冗余）
// function getData1(value:string):string{
//     return value;
// }
// function getData2(value:number):number{
//     return value;
// }
//同时返回 string类型 和number类型       any可以解决这个问题
//  function getData(value:any):any{
//     return '哈哈哈';
// }
// getData(123);
// getData('str');
//any放弃了类型检查,传入什么 返回什么。比如:传入number 类型必须返回number类型  传入 string类型必须返回string类型
//传入的参数类型和返回的参数类型可以不一致
//    function getData(value:any):any{
//         return '哈哈哈';
//     }
// 泛型：可以支持不特定的数据类型   要求：传入的参数和返回的参数一直
// T表示泛型，具体什么类型是调用这个方法的时候决定的
//    function getData<T>(value:T):T{
//        return value;
//    }
//     getData<number>(123);
// getData<string>('1214231');
// getData<number>('2112');       /*错误的写法*/  
//    function getData<T>(value:T):any{
//        return '2145214214';
//    }
//    getData<number>(123);  //参数必须是number
//    getData<string>('这是一个泛型');
// 泛型类：比如有个最小堆算法，需要同时支持返回数字和字符串 a  -  z两种类型。  通过类的泛型来实现
/*

        class MinClass{
            public list:number[]=[];
            add(num:number){
                this.list.push(num)
            }
            min():number{
                var minNum=this.list[0];
                for(var i=0;i<this.list.length;i++){
                    if(minNum>this.list[i]){
                        minNum=this.list[i];
                    }
                }
                return minNum;
            }

        }

        var m=new MinClass();

        m.add(3);
        m.add(22);
        m.add(23);
        m.add(6);

        m.add(7);
        alert(m.min());

*/
//类的泛型
var MinClas = /** @class */ (function () {
    function MinClas() {
        this.list = [];
    }
    MinClas.prototype.add = function (value) {
        this.list.push(value);
    };
    MinClas.prototype.min = function () {
        var minNum = this.list[0];
        for (var i = 0; i < this.list.length; i++) {
            if (minNum > this.list[i]) {
                minNum = this.list[i];
            }
        }
        return minNum;
    };
    return MinClas;
}());
var m1 = new MinClas(); /*实例化类 并且制定了类的T代表的类型是number*/
m1.add(11);
m1.add(3);
m1.add(2);
alert(m1.min());
var m2 = new MinClas(); /*实例化类 并且制定了类的T代表的类型是string*/
m2.add('c');
m2.add('a');
m2.add('v');
alert(m2.min());
