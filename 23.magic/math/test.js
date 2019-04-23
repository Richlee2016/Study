// 斐波那契额 缓存

const cacheMath = () => {
  let cache = []
  return n => {
    if ([1, 2].includes(n)) return 1
    let box = cache.length > 2 ? cache : [1, 1]
    let num = box.length
    while (num < n) {
      const l = box.slice(-2)
      box.push(l[0] + l[1])
      num++
    }
    if (box.length > cache.length) {
      cache = box
    } else {
      return cache[n]
    }
    return box[box.length - 1]
  }
}

const math = cacheMath()
const res = math(10)
const go = math(8)
console.log(res, go)
