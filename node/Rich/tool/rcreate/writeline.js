const readline = require('readline2')
const path = require('path')
const fs = require('fs')
const os = require('os')

const rp = path.resolve(__dirname, './src/router.js')
const rw = path.resolve(__dirname, './src/routers.js')

let fRead = fs.createReadStream(rp)
let fWrite = fs.createWriteStream(rw)
const rl = readline.createInterface({
  input: fRead
})

let lines = []

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  const addLine = ['  {', `    path: '/test',`, `    name: 'Test',`, `    component: Test`, '  }']
  let imline = lines.filter(o => o.includes('import'))
  let objline = lines.filter(o => !o.includes('import'))
  objline.splice(objline.length - 1, 1)
  imline.push(`import Test from '@/views/OtherAgint/Test'`)
  if (objline[objline.length - 1].trim() === '}') {
    objline[objline.length - 1] = '  },'
  }
  objline = imline.concat(objline, addLine, lines[lines.length - 1])
  objline.forEach(o => fWrite.write(`${o}${os.EOL}`))
})
