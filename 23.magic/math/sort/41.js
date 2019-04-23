// 41.缺失的第一个正数
/**
初始位置
交换位置

保存初始值

 */
var firstMissingPositive = function (nums) {
  const arr = Array.from(new Set(nums)).filter(o => o > 0)
  if (arr.length <= 1) {
    if (arr[0] === 1) return 2
    return 1
  }
  let now = 0
  let idx = null
  let res = null
  while (!res && (now < arr.length)) {
    let tem = arr[now]
    idx = now
    for (let i = now; i < arr.length; i++) {
      if (arr[idx] > arr[i]) {
        idx = i
      }
    }
    arr[now] = arr[idx]
    arr[idx] = tem
    let go = arr.slice(0, now + 1)
    if (go.length > 1) {
      if (go[0] !== 1) {
        res = 1
      } else {
        for (let j = 0; j < go.length - 1; j++) {
          if (go[j + 1] - go[j] !== 1) {
            res = go[j] + 1
          }
        }
      }
    }
    now++
  }
  if (!res) {
    res = arr[arr.length - 1] + 1
  }
  return res
}

const a = firstMissingPositive([4, 1, 2, 3])
console.log(a)
