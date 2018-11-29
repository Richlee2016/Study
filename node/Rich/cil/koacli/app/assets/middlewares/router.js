import { Route } from '../decorator'

module.exports = app => {
  const myroutes = new Route(app)
  myroutes.init()
}
