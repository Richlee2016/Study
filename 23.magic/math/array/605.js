// 605.种花问题
/** 自解 */
/**
 * 判断  0 两边的数字是否是1
 * 判断临界条件
 */
var canPlaceFlowers = function (arr, n) {
  if (n === 0) return true
  if (arr.length < 2) {
    if (arr[0] === 0 && n === 1) {
      return true
    }
    return false
  }
  let flower = arr => {
    let num = null
    let len = arr.length
    for (let i = 0; i < len; i++) {
      if (i !== 0 && i !== (len - 1)) {
        if (arr[i - 1] === 0 && arr[i] === 0 && arr[i + 1] === 0) {
          num = i
        }
      } else if (i === 0) {
        if (arr[0] === 0 && arr[1] === 0) {
          num = 0
        }
      } else if (i === (len - 1)) {
        console.log(222)
        if (arr[len - 1] === 0 && arr[len - 2] === 0) {
          num = len - 1
        }
      }
    }
    if (num === null) {
      return false
    } else {
      arr.splice(num, 1, 1)
      return arr
    }
  }
  let tarr = arr
  for (let index = 0; index < n; index++) {
    tarr = flower(tarr)
  }
  return !!tarr
}

const a = canPlaceFlowers([0], 1)
console.log(a)
