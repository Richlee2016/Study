import childProcess from 'child_process'
import { resolve } from 'path'
import os from 'os'

export const MyProcess = app => {
  app.use((ctx, next) => {
    console.log(321)
    return next()
  })
  const worker = childProcess.fork(resolve(__dirname, './crawler.js'))
  worker.send('put your fucking hands up')
  worker.on('message', (msg) => {
    console.log('[Master] Received message from worker: ' + msg)
  })
}
