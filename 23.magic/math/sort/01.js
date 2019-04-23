//  冒泡排序
/**
 嵌套for ===》
 1.嵌套for的条件没有用到上层for的参数 则可以互换位置
 */
const bubbleSort = arr => {
  let tem = null
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      tem = arr[j]
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j + 1]
        arr[j + 1] = tem
      }
    }
  }
  //   console.log(arr)
  // let len = arr.length
  // while (len > 0) {
  //   for (let j = 0; j < len; j++) {
  //     tem = arr[j]
  //     if (arr[j] > arr[j + 1]) {
  //       arr[j] = arr[j + 1]
  //       arr[j + 1] = tem
  //     }
  //   }
  //   len--
  // }
  console.log(arr)
}

bubbleSort([0, 2, 1, 3, 5, 8, 4, 5, 0, 8, 4, 2, 5, 4, 6])
