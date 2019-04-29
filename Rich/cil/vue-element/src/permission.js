import router, { asyncRouter, filterAsyncRouter } from './router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const { Token, Info, NavBar } = store.getters
  if (Token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (NavBar.length > 0) {
        next()
      } else {
        const { roles } = Info
        const currenRoutes = filterAsyncRouter(asyncRouter, roles)
        store.commit('app/SET_BAR', currenRoutes)
        router.addRoutes(currenRoutes)
        next({ ...to, replace: true })
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
