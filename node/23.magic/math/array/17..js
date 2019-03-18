// 17.电话号码的支付组合
// const numArr = [
//   [],
//   [],
//   ['a', 'b', 'c'],
//   ['d', 'e', 'f'],
//   ['g', 'h', 'i'],
//   ['j', 'k', 'l'],
//   ['m', 'n', 'o'],
//   ['p', 'q', 'r', 's'],
//   ['t', 'u', 'v'],
//   ['w', 'x', 'y', 'z']
// ]
/**
 * 递归
 */
//   let result = []
//   for (let a = 0; a < numAr[0].length; a++) {
//     const aa = numAr[0][a]
//     for (let b = 0; b < numAr[1].length; b++) {
//       const bb = numAr[1][b]
//       result.push(aa + bb)
//     }
//   }

const numArr = [
  '',
  '',
  'abc',
  'def',
  'ghi',
  'jkl',
  'mno',
  'pqrs',
  'tuv',
  'wxyz'
].map(o => {
  if (!o) {
    return []
  } else {
    return o.split('')
  }
})

const getStr = str => {
  const strAr = str.split('').map(o => Number(o))
  let numAr = []

  for (let i = 0; i < strAr.length; i++) {
    numAr.push(numArr[strAr[i]])
  }
  let ress = []
  const mathAdd = (arr, index, ell) => {
    if (!arr[index]) return false
    for (let i = 0; i < arr[index].length; i++) {
      const el = arr[index][i]
      mathAdd(arr, index + 1, `${ell}${el}`)
      if (`${ell}${el}` && `${ell}${el}`.length === arr.length) {
        ress.push(`${ell}${el}`)
      }
    }
  }
  mathAdd(numAr, 0, '')
  return ress
}

const fin = getStr('234')
console.log(fin)

// var letterCombinations = function (digits) {
//   var strAr = digits.split('').map(function (o) {
//     return Number(o)
//   })
//   var numAr = []
//   for (var i = 0; i < strAr.length; i++) {
//     numAr.push(numArr[strAr[i]])
//   }
//   var ress = []
//   var mathAdd = function (arr, index, ell) {
//     if (!arr[index]) return false
//     for (var i = 0; i < arr[index].length; i++) {
//       var el = arr[index][i]
//       mathAdd(arr, index + 1, ell + el)
//       if (ell) {
//         ress.push(ell + el)
//       }
//     }
//   }
//   mathAdd(numAr, 0, '')
//   return ress.filter(function (o) {
//     return o.length === numAr.length
//   })
// }
// var go = letterCombinations('234')
// console.log(go)
