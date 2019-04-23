const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * 2.3 resolvePromise  解析promise
 */
function resolvePromise (promise2, x, resolve, reject) {
  // 2.3.1 let p2 = p1.then(res => p2);
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  // 2.3.2 当x为 Promise的时候
  let then, called // promise2 是否 resolve 或者 reject
  // if (x instanceof RPromise) {
  //   if (x.status == PENDING) {
  //     x.then(y => {
  //       resolvePromise(promise2, y, resolve, reject);
  //     });
  //   } else {
  //     x.then(resolve, reject);
  //   }
  //   //2.3.3  x是一个thenable对象或函数 只要有then方法的对象
  // }
  if (x != null && ((typeof x === 'function' || typeof x === 'object'))) {
    // 让我们的promise 和 别人的 进行交互
    // 处理各种兼容情况
    try {
      // obj.then 是个  getter 再get()的时候 throw Error()
      then = x.then
      if (typeof then === 'function') {
        // 有些promise 会同事执行成功和失败的回调
        then.call(
          x,
          y => {
            // 如果 promise2 已经成功 或 失败了 则不处理了
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject) // 可能 then函数的处理 依然是 promise
          },
          err => {
            if (called) return
            called = true
            reject(err)
          }
        )
      } else {
        // 不是 thenable 对象 直接当成值  resolve 抛给 promise2
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    // 如果x是一个普通的值 则直接resolve x
    resolve(x)
  }
}

class RPromise {
  constructor (except) {
    this.status = PENDING
    this.value = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = value => {
      if (value instanceof RPromise) {
        // 如果 value是个promise 则需要 等待promise 完成 再进行步骤
        return value.then(resolve, reject)
      }
      setTimeout(() => {
        if (this.status == PENDING) {
          this.value = value
          this.status = FULFILLED
          this.onResolvedCallbacks.forEach(fn => fn(value))
        }
      })
    }

    const reject = value => {
      setTimeout(() => {
        if (this.status == PENDING) {
          this.value = value
          this.status = REJECTED
          this.onRejectedCallbacks.forEach(fn => fn(value))
        }
      })
    }

    try {
      except(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : value => { throw value }

    let promise2

    if (this.status == FULFILLED) {
      promise2 = new RPromise((resolve, reject) => {
        // 2.2.4  onFulfilled  和 onRejected 必须异步执行
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
    }
    if (this.status == REJECTED) {
      promise2 = new RPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
    }
    if (this.status == PENDING) {
      promise2 = new RPromise((resolve, reject) => {
        this.onResolvedCallbacks.push(value => {
          try {
            let x = onFulfilled(value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        this.onRejectedCallbacks.push(value => {
          try {
            let x = onRejected(value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
    }
    return promise2
  }
  // 只穿 失败回调
  catch (onRejected) {
    return this.then(null, onRejected)
  }
}
// 测试用例
RPromise.deferred = RPromise.defer = () => {
  let defer = {}
  defer.promise = new RPromise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

try {
  module.exports = RPromise
} catch (e) {

}
