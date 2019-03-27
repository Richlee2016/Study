import App from './App'
import Vue from 'vue'
import Router from 'vue-router'
Vue.config.productionTip = false
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['./pages/Home'], resolve)
    },
    {
      path: '/Movie',
      name: 'Movie',
      component: resolve => require(['./pages/Movie'], resolve)
    }
  ]
})
const vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
