const yargs = require('yargs')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util');
(async () => {
  const pro = {
    mkdir: promisify(fs.mkdir),
    writeFile: promisify(fs.writeFile),
    copy: promisify(fs.copyFile)
  }
  const box = yargs.option('p', {
    alias: 'page',
    default: 'index',
    describe: '请输入文件名称',
    type: 'string'
  }).argv

  if (box.page) {
    const nowPath = path.join(process.cwd(), box.page)
    await pro.mkdir(nowPath)
    let vueTem = path.resolve(__dirname, './temple/index.vue')
    let storeTem = path.resolve(__dirname, './temple/store.js')
    let copyTem = path.resolve(__dirname, nowPath, `./${box.page}`)
    await pro.copy(vueTem, copyTem + '.vue')
    await pro.copy(storeTem, copyTem + '.js')
  }
})()
