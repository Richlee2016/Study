// 696.计算二进制子串
/**
0011 0011
0 01 10011
00 1100 11
001 10 011
0011 0011
00110 01 1
*/
const countBinary = str => {
  const match = (s) => {
    const a = s.match(/^(0+)|(1+)/)[0]
    const b = (a[0] ^ 1).toString().repeat(a.length)
    const reg = new RegExp(`${a}${b}`)
    return s.match(reg) ? s.match(reg)[0] : ''
  }
  let result = []
  for (let i = 0; i < str.length - 1; i++) {
    const s = match(str.slice(i))
    if (s) {
      result.push(s)
    }
  }
  return result
}
const box = countBinary('00110011')
console.log(box)
