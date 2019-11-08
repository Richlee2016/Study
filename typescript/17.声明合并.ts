/*
声明类型  创建了命名空间  创建了类型  创建了值

Namespace 1 0 1 

Class 0 1 1

Enum 0 1 1

Interface 0 1 0

Type Alias 类型别名  0  1  0

Function 0 0 1

Variable 0 0 1

*/
interface InfoInter {
  name: string;
  sayName?(name:string):string
}

interface InfoInter {
  age: number;
}

let info:InfoInter

info = {
    name:'rc',
    age:312
}

// 不同类型的 合并

// 类与命名空间

// 命名空间 与  函数

// 枚举 与 命名空间
