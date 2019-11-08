// babel核心库 用来实现核心转换引擎
let babel = require('babel-core')
// 可以实现类型类似 生成AST零部件
let types = require('babel-types')

// const esprima = require("esprima");
// const estraverse = require("estraverse");
// const escodegen = require('escodegen');
let code = 'const sum = (a,b) => { return a + b }'
// 这个访问者 可以对特定的类型的节点进行处理
// let visitor = {
//   ArrowFunctionExpression{
//     enter(){},
//     leave(){}
//   }
// }
// 只处理一次
let visitor = {
  ArrowFunctionExpression (path) {
    let params = path.node.params
    // 生成函数块
    // let body = types.blockStatement([
    //   types.returnStatement(path.node.body)
    // ]);
    let body = path.node.body
    // console.log(types.returnStatement(path.node));
    // // 生成新函数
    let fun = types.functionExpression(null, params, body, false, false)
    // // 新旧替换
    path.replaceWith(fun)
  }
}

let arrayPlugin = { visitor }
// babel 内部先把代码转成 AST 然后进行遍历
let result = babel.transform(code, {
  plugins: [
    arrayPlugin
  ]
})

console.log(result.code)
