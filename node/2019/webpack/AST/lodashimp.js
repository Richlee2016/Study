let babel = require('babel-core')
let types = require('babel-types')

const code = `import {map,some} from 'lodash'`

const visitor = {
  ImportDeclaration: {
    enter (path) {
      const node = path.node
      const specifiers = node.specifiers
      const val = node.source.value
      let declarations = []
      // 一定要注意 一些api的判断条件
      console.log(types.isImportDefaultSpecifier(specifiers[0]))
      if (!types.isImportDefaultSpecifier(specifiers[0])) {
        specifiers.forEach(o => {
          const ide = o.local
          const importDefaultSpecifier = types.importDefaultSpecifier(ide)
          const stringLiteral = types.stringLiteral(`${val}/${ide.name}`)
          const importDeclaration = types.importDeclaration([importDefaultSpecifier], stringLiteral)
          declarations.push(importDeclaration)
        })
        // 当使用replace的时候  会一个一个替换 所以必须判断替换的条件 不然会导致无限循环
        path.replaceWithMultiple(declarations)
      }
    }
  }
}

const result = babel.transform(code, {
  plugins: [{ visitor }]
})

console.log(result.code)
