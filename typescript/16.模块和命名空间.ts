// 命名空间
/**
 * 工具库  模块
 * 防止全局污染 命名空间
 */

 /// <reference path='./modlue/space.ts'>
 /// <reference path='./modlue/ospace.ts'>
 let isletter = MySpace.age
 let gogo = MySpace.go

 namespace Shapes{
     export namespace Pay{
         export const nice = 'good'
     }
 }

 import pay = Shapes.Pay

 const nice = pay.nice