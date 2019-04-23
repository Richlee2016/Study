const http = require('http')
const server = http.createServer((req, res) => {
  res.end('123')
})

server.listen('8026')
