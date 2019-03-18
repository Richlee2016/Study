const esprima = require('esprima')
const estraverse = require('estraverse')
const escodegen = require('escodegen')
let code = 'function ast(){}'
let ast = esprima.parse(code)

estraverse.traverse(ast, {
  enter: function (node, parent) {
    console.log('enter', node.type)
    if (node.type == 'Identifier') {
      node.name += '_enter'
    }
  },
  leave: function (node) {
    console.log('leave', node.type)
    if (node.type == 'Identifier') {
      node.name += '_leave'
    }
  }
})

let result = escodegen.generate(ast)

console.log(result)
