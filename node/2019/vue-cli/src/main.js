import App from './App'
import Vue from 'vue'

Vue.config.productionTip = false

const vue = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
