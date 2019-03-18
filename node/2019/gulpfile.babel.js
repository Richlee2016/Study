// import requireDir from 'require-dir'
import glob from 'glob'
import path from 'path'

glob.sync(path.resolve(__dirname, './gulp/*.js')).forEach(require)
// requireDir('./gulp')
