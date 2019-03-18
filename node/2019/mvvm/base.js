import MVVM from './MVVM.js'

const mvvm = new MVVM({
  el: '#app',
  data: {
    a: 1,
    b: 2,
    c: [3, 4],
    d: {
      e: 6,
      f: [1, 3]
    },
    class: 'good',
    nice: {
      box: 'lee'
    }
  },
  methods: {
    GoGo () {
      this.b = 321
    }
  },
  computed: {
    leego () {
      return this.b + 2
    }
  }
})
console.log(mvvm)
