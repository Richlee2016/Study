"use strict";
//函数类型接口
function getData(value) {
    return value;
}
var myGetData = getData;
myGetData('20'); /*正确*/
// myGetData(20)  //错误
