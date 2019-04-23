// 30. 串联所有单词的子串

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
/**  没有考虑 重复 words 的出现 */
// var findSubstring = function (s, words) {
//   let result = []
//   const getOne = (sw, num) => {
//     let idx = words.map(o => sw.indexOf(o)).sort().filter(o => o >= 0)
//     console.log(idx)
//     if (idx.length !== words.length) return false
//     result.push(idx[0] + num)
//     let nextStart = idx[idx.length - 1] + words[0].length
//     if (sw.length < nextStart) return false
//     sw = sw.substr(nextStart)
//     getOne(sw, nextStart)
//   }
//   getOne(s, 0)
//   return result
// }

var findSubstring = function (str, words) {
  let len = words[0].length
  let arrlen = words.length
  let nextStr = str
  let result = []
  let tem = []
  const cut = (s, start) => {
    if (start === 0) {
      return '+'.repeat(len) + s.substr(len, s.length)
    } else {
      return s.substr(0, start) + '+'.repeat(len) + s.substr(start + len, s.length)
    }
  }
  const cutgo = (st, arr) => {
    let idx = st.indexOf(arr[0])
    if (idx === -1) return
    nextStr = cut(nextStr, idx)
    tem.push(idx)
    arr.splice(0, 1)
    if (tem.length !== arrlen) {
      cutgo(nextStr, arr)
    } else {
      let sortarr = tem.sort((a, b) => a - b > 0)
      result.push(sortarr)
      tem = []
      cutgo(nextStr, [...words])
    }
  }
  cutgo(str, [...words])
  result.forEach((o, a) => {
    for (let i = 0; i < o.length - 1; i++) {
      if (o[i + 1] - o[i] !== len) {
        result[a] = []
      }
    }
  })
  // console.log(result)
  return result.filter(o => o.length !== 0).map(o => o[0])
}

const a = findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word'])
console.log(a)
