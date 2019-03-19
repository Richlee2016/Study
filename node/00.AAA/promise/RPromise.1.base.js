/**
 * 最基础写法  不处理连续then
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class RPromise {
  constructor (except) {
    this.status = PENDING
    this.value = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    /**
     * 2.1
     * ---------------------------
     * 2.1.1 当调用此方法的时候 如果promise 状态为pending 的话 可以转成 成功态
     * 如果已经是成功态 或者 失败态了 什么都不做
     */
    const resolve = value => {
      if (this.status == PENDING) {
        this.status = FULFILLED
        this.value = value // 2.1.2成功之后 会得到一个值 这个值不能更改
        this.onResolvedCallbacks.forEach(fn => fn(this.value))
      }
    }

    const reject = value => {
      if (this.status == PENDING) {
        this.status = REJECTED
        this.value = value // 2.1.3失败之后 会得到一个值 这个值不能更改
        this.onRejectedCallbacks.forEach(fn => fn(this.value))
      }
    }
    // 捕获异常
    try {
      except(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  /**
   * 2.2  then  获取最终的值
   * then(onFulfilled,onRejected)  一个then接收两个参数
   * --------------------------------
   * onFulfilled onRejected 是用来接收 promise 成功的值或者失败的原因 成功 失败函数
   *
   */
  then (onFulfilled, onRejected) {
    /**
     * 值的穿透
     * let p2 = p1.then()
     * p2.then(res => {})
     */
    // 2.2.1 如果成功和失败的回调没有传 表示这个then没有任何逻辑 只会把值往后抛
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : value => { throw value }
    let promise2
    // 2.2.2 如果当前promise状态已经成功了  onFulfilled  直接取值
    if (this.status == FULFILLED) {
      let x = onFulfilled(this.value)
    }
    // 2.2.3 如果当前promise状态已经失败了  onRejected  直接取值
    if (this.status == REJECTED) {
      let x = onRejected(this.value)
    }
    // 2.2.3 如果当前promise状态未知  则把状态先 装进 数组 以便未来调用  （异步的时候）
    if (this.status == PENDING) {
      this.onResolvedCallbacks.push(() => {
        let x = onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        let x = onRejected(this.value)
      })
    }
  }
}
