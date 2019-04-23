const childProcess = require('child_process')
const { resolve } = require('path')
const worker = childProcess.fork(resolve(__dirname, './worker.js'))
worker.send('put your fucking hands up')
// worker.on('message', (msg) => {
//   console.log('[Master] Received message from worker: ' + msg)
// })

// console.log(321)
