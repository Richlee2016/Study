// 459.重复的子字符串
/**
    1.算出能均分字符串的 长度 值
    2.根据长度值 均分字符串
    3.用第一个字符串与 所有的比较
 */
const repeatedSubstringPattern = s => {
  let len = s.length
  let result = false
  const match = idx => {
    let arr = s.split('')
    let eqarr = []
    while (arr.length) {
      eqarr.push(arr.splice(0, idx).join(''))
    }
    result = eqarr.every(o => eqarr[0] === o)
  }
  for (let i = 1; i <= len; i++) {
    if (len % i === 0 && i !== len) {
      match(i)
    }
  }
  return result
}

repeatedSubstringPattern('aaabcbcaaabcbc')

// console.log([1, 2, 3].toString() === [1, 2, 3].toString())
