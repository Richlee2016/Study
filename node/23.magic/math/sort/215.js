// 215.数组中的第K个最大元素
/**
 去重 排序
 1.性能更好的 办法  冒泡k次
 */
var findKthLargest = function (nums, k) {
  // const sortArr = Array.from(new Set(nums)).sort()
  // return sortArr[sortArr.length - k]
  const arr = Array.from(new Set(nums))
  let tem = null
  for (let i = arr.length; i > (arr.length - k); i--) {
    for (let j = 0; j < i; j++) {
      tem = arr[j]
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j + 1]
        arr[j + 1] = tem
      }
    }
  }
  return arr[arr.length - k]
}
const b = findKthLargest([1, 5, 6, 2, 4, 3, 8, 7, 8, 9], 3)
console.log(b)
