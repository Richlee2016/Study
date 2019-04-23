import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LazyRoute from 'lazy-route'
import qs from 'qs'
// 解析地址数据
const getRouterData = (location, match) => {
  let query = /\?(.+)/.test(location.search) ? qs.parse(RegExp.$1) : {}
  return {
    params: match.params,
    query
  }
}

// 按需加载
const LazyRoteMid = (props, im) => {
  const $route = getRouterData(props.location, props.match)
  return <LazyRoute a={321} $route={$route} {...props} component={im} />
}

const routes = [
  {
    path: '/',
    exact: true,
    component (props) {
      return LazyRoteMid(props, import('@/views/Home'))
    }
  },
  {
    path: '/page',
    exact: true,
    component (props) {
      return LazyRoteMid(props, import('@/views/Page/Index'))
    }
  }
]

// const routes = myRoutes.concat(right)

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    render={props => (route.component(props))} />
)

const RouteConfig = () => (
  <Switch>
    {routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route} />))}
  </Switch>
)

export default RouteConfig
