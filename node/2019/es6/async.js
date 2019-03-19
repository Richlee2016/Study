const _timer = time => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(321)
  }, time)
})

// function * mygen () {
//   yield 1
//   const a = yield _timer(2000)
//   return a
// }
// const gen = mygen()
// var q = gen.next()
// var w = gen.next()
// var e = gen.next(w.value) // next 的参数会当做上一个 yield 的返回值 就是第二个yield
// console.log(q)
// console.log(w)
// console.log(e)

// co 函数让yield自动执行 返回一个 Promise

function * go () {
  const a = yield _timer(2000)
  return 1 + a
}

// let a = go()

const co = (gen) => {
  let it = gen() // generator 函数
  // 返回一个 promise  这个 promise  让 it 自动执行
  //   value 必然是个 promise(co的用处)
  return new Promise((resolve, reject) => {
    (function next (lastval) {
      console.log(lastval)
      let { value, done } = it.next(lastval)
      console.log(value, done)
      if (done) {
        resolve(lastval)
      } else {
        // promise 链式调用
        value.then(next, err => reject(err))
      }
    })()
  })
}

co(go).then(res => {
  console.log(res)
})
