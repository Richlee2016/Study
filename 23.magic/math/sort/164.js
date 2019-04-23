// 164.最大间距
/**
1.去重
2.排序
3.计算所有间距
4.算出最大值
 */
var maximumGap = function (array) {
  if (array.length < 2) return 0
  const arr = Array.from(new Set(array)).sort()
  let dis = []
  for (let a = 0; a < arr.length - 1; a++) {
    dis.push(arr[a + 1] - arr[a])
  }
  return Math.max(...dis)
}

var max = maximumGap([[1, 2, 1, 5, 4]])
console.log(max)
