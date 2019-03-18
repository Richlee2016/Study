// 682.棒球比赛

/**
有效分数的 出入栈
 */
var calPoints = function (ops) {
  let arr = []
  for (let i = 0; i < ops.length; i++) {
    const el = ops[i]
    switch (el) {
      case '+':
        arr.unshift(arr[0] + arr[1])
        break
      case 'D':
        arr.unshift(2 * arr[0])
        break
      case 'C':
        arr.shift()
        break
      default:
        arr.unshift(Number(el))
        break
    }
  }
  return arr.reduce((n, o) => {
    n += o
    return n
  }, 0)
}

const a = calPoints(['5', '2', 'C', 'D', '+'])
console.log(a)
