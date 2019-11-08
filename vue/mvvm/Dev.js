export default class Dev {
  constructor () {
    this.Subs = []
  }

  addSub (sub) {
    this.Subs.push(sub)
  }

  notify () {
    this.Subs.forEach(sub => {
      sub.update()
    })
  }
}
