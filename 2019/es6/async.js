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
  const b = yield _timer(4000)
  return 1 + a + b
}

// function co (gen) {
//   let it = gen()
//   return new Promise((resolve, reject) => {
//     const { value, done } = it.next()
//     value.then(res => {
//       //上一个 yield 的返回值为 res
//       const { value, done } = it.next(res)
//       if(done){
//         resolve(res)
//       }else{
//         value.then(twoRes => {
//           const { value, done } = it.next(res)...
//         },err => reject(err))
//       }
//     },err => reject(err))
//   })
// }

// let a = go()

// const co = (gen) => {
//   let it = gen()
//   return new Promise((resolve, reject) => {
//     (function next (lastval) {
//       // it.next(lastval)  把上一个 promise 的返回值传给 上一个 yield  使其再gen中获取 到promise的返回值
//       let { value, done } = it.next(lastval)
//       if (done) {
//         resolve(lastval)
//       } else {
//         value.then(next, err => reject(err))
//       }
//     })()
//   })
// }

function co (gen) {
  let it = gen()
  return new Promise((resolve, reject) => {
    (function next (lastVal) {
      const { value, done } = it.next(lastVal)
      if (done) {
        resolve(lastVal)
      } else {
        value.then(next, err => reject(err))
      }
    })()
  })
}

co(go).then(res => {
  console.log(res)
})
