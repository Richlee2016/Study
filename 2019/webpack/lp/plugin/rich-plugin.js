class RichPlugin {
  constructor (options) {
    this.options = options
  }
  apply (compiler) {
    compiler.hooks.compilation.tap('CompilationPlugin', compilation => {
      compilation.hooks.optimize.tap('optimize', () => {
        console.log('资源正在被优化')
        console.log(this.options)
      })
    })
  }
}
module.exports = RichPlugin
