let esprima = require('esprima')
var estraverse = require('estraverse')
var escodegen = require('escodegen')

let code = 'function ast(){}'

let ast = esprima.parse(code)

estraverse.traverse(ast, {
  enter (node) {
    // console.log(node)
    // node.name += '_ext';
  },
  leave (node) {
    // console.log(node.type);
  }
})

let generated = escodegen.generate(ast)

console.log(generated)
