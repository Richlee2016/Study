// 914.卡片分组

const arr = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2]
/**
 1.递归 每个数字对比
 2.相同的从原数组中取出 成组
 3.排序
 4.分组
 */
const hasGroupsSizeX = arr => {
  let index = 0
  let allArr = []
  if (arr.length < 2) return false
  const loop = (larr) => {
    if (larr.length < 2) return false
    let one = larr[0]
    allArr[index] = []
    for (let i = 0; i < larr.length; i++) {
      const el = larr[i]
      if (one === el) {
        allArr[index].push(larr.splice(i, 1, 'good')[0])
      }
    }
    index++
    loop(larr.filter(o => o !== 'good'))
  }
  loop(arr)
  let lenArr = allArr.map(o => o.length)
  let f = lenArr[0]
  for (let a = 0; a < lenArr.length; a++) {
    if (f >= lenArr[a]) {
      f = lenArr[a]
    }
  }
  if (f < 2) return false
  let isGo = false
  for (let i = 0; i < f; i++) {
    if (i !== 0) {
      // 2~自身 的数其中之一可以整除可以整除
      if (lenArr.every(o => o % (i + 1) === 0)) {
        isGo = true
      }
    }
  }
  return isGo
}

const b = hasGroupsSizeX(arr)
// console.log(b)

/** 数组 同类叠加  map 结构  同类必须完全相等 */
var aaa = { a: 1, b: 2 }
const aarr = [aaa, { c: 1, d: 2 }, aaa]
const amap = new Map()
for (const o of aarr) {
  const getMap = amap.get(o)
  amap.set(o, ~~(getMap) + 1)
}
console.log(amap)
/** for  与 forof  数字循环等价 */
for (const i of Array(2).fill().keys()) {
  console.log(i)
}
// var hasGroupsSizeX = function (deck) {
//   const map = {}
//   for (let num of deck) {
//     map[num] = ~~(map[num]) + 1
//   }

//   const min = Math.min(...(Object.values(map)))

//   if (min < 2) {
//     return false
//   }
//   console.log(Array(min).fill())
//   for (let index of Array(min).fill().keys()) {
//     if (index === 0) continue
//     console.log(Object.values(map), index + 1)
//     if (Object.values(map).every(item => item % (index + 1) === 0)) {
//       console.log(11)
//       return true
//     }
//   }
//   return false
// }

// const a = hasGroupsSizeX(arr)
// console.log(a)
