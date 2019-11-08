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
 * never  报错 或 无线循环这种
 * 断言  
 * {
 * let a:any = 'rich  
 * let len:number = (<string>a).length 
 * 或者 let len:number = (a as string).length 
 * }
 * 
 */

let objany:any = {
    a:1,
    b:2
} 

console.log('any obj', objany.a, objany.b);

interface myobj {
    a:number;
    b:number;
    readonly c:string;
}
let objinter:myobj = {
    a:3,
    b:4,
    c:'rich'
} 

console.log('interface obj', objinter.a, objinter.b);

// 解构
let sayName = ([a,b]:[string,number]):void => {
    console.log(a,b);
} 

sayName(['rich',1])

let sayAge = ({a,b}:{a:string,b:number}):void => {
    console.log(a,b);
}

sayAge({a:'rich',b:28})

// 解构的默认值
let goHome = ({a = 'rich',b = 2}:{a?:string,b?:number}):void => {
    console.log(a,b);
}
goHome({a:'lee'})

/**
 * interface 接口
 */
// 只读属性
interface myobj {
    a:number;
    b:number;
    readonly c:string;
}
// 任意字段
interface box1{
    a:number,
    b?:string,
    [c:string]:any
}

let go1:box1 = {
    a:1,
    // b:'nice',
    gogo:'nice',
    jiu:'yo'
}

// 可索引
// 数字索引
interface index2 {
    [index:number]:number
}

let in2:index2 = [1,2,3]


interface index3 {
    readonly [index:number]:string
}

let in3:index3 = ['rich','lee']
// in3[1] = 2

// 字符串索引
interface index1 {
    [index:string]:number;
    len:number;
    go:number;
}

let in1:index1 = {len:1,go:2}

// 继承
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}
// 
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
console.log(square);
