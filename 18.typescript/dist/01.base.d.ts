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
declare let objany: any;
interface myobj {
    a: number;
    b: number;
    readonly c: string;
}
declare let objinter: myobj;
declare let sayName: ([a, b]: [string, number]) => void;
declare let sayAge: ({ a, b }: {
    a: string;
    b: number;
}) => void;
declare let goHome: ({ a, b }: {
    a?: string | undefined;
    b?: number | undefined;
}) => void;
/**
 * interface 接口
 */
interface myobj {
    a: number;
    b: number;
    readonly c: string;
}
interface box1 {
    a: number;
    b?: string;
    [c: string]: any;
}
declare let go1: box1;
interface index2 {
    [index: number]: number;
}
declare let in2: index2;
interface index3 {
    readonly [index: number]: string;
}
declare let in3: index3;
interface index1 {
    [index: string]: number;
    len: number;
    go: number;
}
declare let in1: index1;
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
declare let square: Square;
