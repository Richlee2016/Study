"use strict";
// 数字枚举
var getIndex = function () {
    return 2;
};
var Status;
(function (Status) {
    Status[Status["Uploading"] = 3] = "Uploading";
    Status[Status["Success"] = getIndex()] = "Success";
    Status[Status["Failed"] = 5] = "Failed";
})(Status || (Status = {}));
console.log(Status.Uploading);
console.log(Status.Success);
console.log(Status);
// 字符串枚举
var Message;
(function (Message) {
    Message["Error"] = "sorry, error";
    Message["Success"] = "Hoho, success";
    Message["Failed"] = "sorry, error";
})(Message || (Message = {}));
console.log(Message);
// 混合  异构枚举 不建议使用
var Result;
(function (Result) {
    Result[Result["Failed"] = 0] = "Failed";
    Result["Success"] = "success";
})(Result || (Result = {}));
// 1.不带初始值的 枚举
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
// 2
var A;
(function (A) {
    A["A"] = "a";
})(A || (A = {}));
// 3 可以直接作为  类型使用
var B;
(function (B) {
    B[B["B"] = -1] = "B";
})(B || (B = {}));
// 联合类型
var Turn;
(function (Turn) {
    Turn[Turn["off"] = 0] = "off";
    Turn[Turn["on"] = 1] = "on";
})(Turn || (Turn = {}));
var door = {
    status: Turn.off
};
var my = 0 /* nice */;
