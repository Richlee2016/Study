import path from 'path'

const ROOT = 'E:/AAA2018/Now/node-movie/app'
// const ROOT = ''

export const rootPath = (...src) => src ? path.join(ROOT, ...src) : ROOT
