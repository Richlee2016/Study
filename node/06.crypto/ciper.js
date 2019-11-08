//对称加密 加密和上面的摘要 解密 与 反解
const crypto = require('crypto')
const fs = require('fs');
const path = require('path')
const str = 'xyz'
const pk = fs.readFileSync(path.join(__dirname,'rsa_private.key'))
const cipher = crypto.createCipher('blowfish',pk)
cipher.update(str,'utf8')
const res = cipher.final('hex');
console.log(res);

const deCipher = crypto.createDecipher('blowfish',pk);
deCipher.update(res,'hex');
const deres = deCipher.final('utf8')
console.log(deres);