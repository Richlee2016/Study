import CryptoJS from 'crypto-js'
let key = '5b99eed104eb5b65'
const str = 'uin=testid&time=1553167825'

var encrypted = CryptoJS.AES.encrypt(str, key)

console.log(encrypted.toString())
