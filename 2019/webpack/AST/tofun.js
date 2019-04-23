let babel = require('babel-core')
let types = require('babel-types')

let code = 'const sum = (a,b) => a+b'
/*
对比  const sum = (a,b) => a + b 与
cosnt sum = function(a,b){
    retirm a + b
}
的语法树 中的区别 找到 相同的地方 把不同的地方的type 查询 babel/type api 进行替换

替换的顺序是从 里到外层

不同的地方

箭头函数 =》 函数名
无返回 =》 大括号加返回值

*/
const visitor = {
  ArrowFunctionExpression: {
    enter (path) {
      let node = path.node
      let expression = node.body
      let params = node.params
      let returnStatement = types.returnStatement(expression) // 返回值替换
      let block = types.blockStatement([ // 大括号替换
        returnStatement
      ])
      let func = types.functionExpression(null, params, block, false, false) // 函数名替换
      console.log(func)
      path.replaceWith(func)
    }
  }
}

const result = babel.transform(code, {
  plugins: [
    { visitor }
  ]
})

console.log(result.code)
