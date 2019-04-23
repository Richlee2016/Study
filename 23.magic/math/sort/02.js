// 选择排序
/**

注意两次遍历的条件 生成嵌套遍历
1.保存比较值
2.找到比比较值小的值 储存其位置  并把其变为比较值 继续比较
3.找到最小的比较值  与初始比较值转换位置

 */
const choiceSort = arr => {
//   let now = 0
//   let min = null
//   let tem = null
//   while (now < arr.length - 1) {
//     min = now
//     tem = arr[now]
//     for (let i = now + 1; i < arr.length; i++) {
//       const el = arr[i]
//       if (arr[min] >= el) {
//         min = i
//       }
//     }
//     arr[now] = arr[min]
//     arr[min] = tem
//     now++
//   }
//   console.log(arr)
  let min = null
  let tem = null
  for (let i = 0; i < arr.length - 1; i++) {
    min = i
    tem = arr[i]
    for (let j = i + 1; j < arr.length; j++) {
      const el = arr[j]
      if (arr[min] >= el) {
        min = j
      }
    }
    arr[i] = arr[min]
    arr[min] = tem
  }
  console.log(arr)
}

// choiceSort([1, 0, 5, 2, 3, 2])
choiceSort([0, 1, 5, 4, 2, 4, 54, 5, 4, 5, 4, 2, 4, 5, 4, 2, 4, 24, 5, 2, 8, 96, 74, 5, 2])
