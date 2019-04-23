
/*
接口的作用：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。 typescrip中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。

定义标准。

*/


// 函数类型接口:对方法传入的参数 以及返回值进行约束    批量约束



// 加密的函数类型接口

interface encrypt{
    (key:string,value:string):string;
}

 
var md5:encrypt=function(key:string,value:string):string{
        //模拟操作
        return key+value;
}

console.log(md5('name','zhangsan'));



var sha1:encrypt=function(key:string,value:string):string{

    //模拟操作
    return key+'----'+value;
}

console.log(sha1('name','lisi'));