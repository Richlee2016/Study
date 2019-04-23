const CryptoJS = require('crypto-js')
let key = '5b99eed104eb5b65'
const str = 'uin=testid&time=1553167825'
// BCDC96141942A6F2ED3ED517AD6AA62A09D8D3B9B0AE17830038FD06DD7D26C8
// BCDC96141942A6F2ED3ED517AD6AA62A09D8D3B9B0AE17830038FD06DD7D26C8
key = CryptoJS.enc.Utf8.parse(key)
let iv = CryptoJS.enc.Hex.parse('F0E1D2C3B4A5968778695A4B3C2D1E0F')
function Decrypt (word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法
function Encrypt (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding })
  return encrypted.ciphertext.toString().toUpperCase()
}
console.log(Encrypt(str))
console.log(Decrypt('BCDC96141942A6F2ED3ED517AD6AA62A09D8D3B9B0AE17830038FD06DD7D26C8'))
console.log(Decrypt('48A8233198886612967A4DCD06C294CE'))
