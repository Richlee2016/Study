const http = require('http')

const opt = {
  host: 'www.baidu.com',
  method: 'GET'
}
const client = http.request(opt, (res) => {
  console.log(`状态码: ${res.statusCode}`)
  console.log(`响应头: ${JSON.stringify(res.headers)}`)
  res.setEncoding('utf8')
  res.on('data', (chunk) => {
    console.log('响应内容', chunk)
  })
  res.on('end', () => {
    console.log('响应中已无数据')
  })
})

client.on('error', err => {
  console.log('error===>', err)
})

client.end()
