// 插入排序  二分插入

const insort = array => {
  for (var i = 1; i < array.length; i++) {
    var key = array[i]
    var j = i - 1
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = key
  }
  console.log(array)
}

insort([1, 0, 5, 4, 2, 4, 54, 5, 4, 5, 4, 2, 4, 5, 4, 2, 4, 24, 5, 2, 8, 96, 74, 5, 2])
