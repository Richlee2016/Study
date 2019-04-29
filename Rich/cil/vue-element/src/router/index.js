import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Index.vue'
import Login from '@/views/Login/Index.vue'
import Merchant from './Merchant'
import Parking from './Parking'
import Error404 from '@/views/Error/404'
import NoRole from '@/views/Error/norole'
import Layout from '@/layout'
Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    redirect: 'home',
    meta: {
      title: '首页'
    },
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: Login
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404'
    },
    component: Error404
  },
  {
    path: '/norole',
    name: 'norole',
    meta: {
      title: '没有权限'
    },
    component: NoRole
  }
]

export const asyncRouter = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  ...Parking,
  ...Merchant
]

const hasPermission = (roles, route) => {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRouter = (routes, roles) => {
  const mapRouter = []
  routes.forEach(r => {
    const tmp = { ...r }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      mapRouter.push(tmp)
    }
  })
  return mapRouter
}

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
