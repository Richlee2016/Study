process.on('message', (msg) => {
  console.log('[Worker] Received message from master: ' + msg)
  process.send('Hi master.')
})
