const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils')
// 参数校验
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  let schema = {
    'type': 'object',
    'properties': {
      'one': {
        'type': 'string'
      }
    }
  }
  // console.log('this.context', this.context)
  // console.log('this.resource', this.resource)
  // console.log('this.resourcePath', this.resourcePath)
  // console.log('this.resoureQuery', this.resoureQuery)
  // console.log('this.loadModule', this.loadModule)
  // console.log('this.resolve', this.resolve)
  // console.log('this.addDependency', this.addDependency)
  // console.log('this.addContextDependency', this.addContextDependency)
  // console.log('this.clearDependencies', this.clearDependencies)
  this.cacheable && this.cacheable()
  validateOptions(schema, options, '参数校验')

  this.callback(null, 'let a;')
}
