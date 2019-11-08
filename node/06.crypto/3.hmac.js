/**
 * git bash
 * openssl genrsa -out rsa_private.key 1024
 */

const crypto = require('crypto')
const path= require("path")
const fs = require("path")
const hmac = crypto.createHash('sha1','abc')
hmac.update('123')
const res = hmac.digest('hex')
console.log(res);