"use strict";
var MySpace;
(function (MySpace) {
    const name = 'rich';
    // export 标记 对外可见
    MySpace.age = 16;
    MySpace.check = (text) => 'nice';
})(MySpace || (MySpace = {}));
