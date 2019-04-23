// 557.反转字符串中的单词 III

const reversStr = str => str.split(' ').map(o => o.split('').reverse().join('')).join(' ')
const re = reversStr(`Let's take LeetCode contest`)

console.log(re)
