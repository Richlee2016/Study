const _timer = time => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(321)
  }, 1000)
})

function * go () {
  const a = yield _timer(200)
  return 1 + a
}
function co (gen) {
  let it = gen()
  return new Promise(function (resolve, reject) {
    (function next (lastVal) {
      let { value, done } = it.next(lastVal)
      if (done) {
        resolve(value)
      } else {
        value.then(next, err => reject(err))
      }
    }())
  })
}

co(go).then(data => {
  console.log(data)
})
