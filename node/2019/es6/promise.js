const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    throw new TypeError('循环引用')
  }

  if (x instanceof RPromise) {
    if (x.statu === PENDING) {
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject)
      })
    }

    if (x.statu === FULFILLED) {
      resolve(x)
    }
    if (x.statu === REJECTED) {
      reject(x)
    }
  }
  let then = null
  let called = false
  try {
    if (['function', 'object'].includes(typeof x)) {
      console.log(x.then)
      then = x.then
      // 兼容 其他  promise 库
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          err => {
            if (called) return
            called = true
            reject(err)
          })
      } else {
        resolve(x)
      }
    } else {
      resolve(x)
    }
  } catch (error) {
    if (called) return
    called = true
    reject(error)
  }
}

class RPromise {
  constructor (except) {
    this.statu = PENDING
    this.value = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      if (this.statu === PENDING) {
        this.statu = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(cb => {
          cb()
        })
      }
    }

    const reject = value => {
      if (this.statu === PENDING) {
        this.statu = REJECTED
        this.value = value
        this.onRejectedCallbacks.forEach(cb => {
          cb()
        })
      }
    }

    try {
      except(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : value => { throw value }
    let promise2 = null
    if (this.statu === FULFILLED) {
      promise2 = new RPromise((resolve, reject) => {
        try {
          let x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
      return promise2
    }

    if (this.statu === REJECTED) {
      promise2 = new RPromise((resolve, reject) => {
        try {
          let x = onRejected(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
      return promise2
    }

    if (this.statu === PENDING) {
      promise2 = new RPromise((resolve, reject) => {
        try {
          this.onResolvedCallbacks.push(() => {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          })
          this.onRejectedCallbacks.push(() => {
            let x = onRejected(this.value)
            resolvePromise(promise2, x, resolve, reject)
          })
        } catch (error) {
          reject(error)
        }
      })
      return promise2
    }
  }
}
