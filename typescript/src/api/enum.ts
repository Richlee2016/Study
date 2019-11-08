// 数字枚举
const getIndex =() => {
    return 2
}
enum Status {
  Uploading = 3,
  Success = getIndex(),
  Failed = 5
}

console.log(Status.Uploading);
console.log(Status.Success);
console.log(Status);


// 字符串枚举
enum Message {
    Error = 'sorry, error',
    Success = 'Hoho, success',
    Failed = Error
}

console.log(Message);

// 混合  异构枚举 不建议使用
enum Result {
    Failed = 0,
    Success = 'success'
}

// 1.不带初始值的 枚举

enum E{
    A
}

// 2

enum A{
    A = 'a'
}

// 3 可以直接作为  类型使用
enum B{
    B = -1
}

// 联合类型

enum Turn {
    off,
    on
}

interface MyTurn {
    status:Turn
}

const door:MyTurn = {
    status:Turn.off
}

// 会编译 枚举 为 js
const enum Go {
    nice,
    good
}

const my = Go.nice