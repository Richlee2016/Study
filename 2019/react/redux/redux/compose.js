// 函数的叠加

/**
const a = (e) => e + 3    27
const f = (g) => g * 8    24
const b = (c, d) => c + d  3
const e = go(a, f, b)(1, 2)
console.log(e)  27

 */
export default fns => {
  if (fns.length === 1) return fns[0]
  return fns.reduce((a, b) => (...arg) => a(b(...arg)))
}
