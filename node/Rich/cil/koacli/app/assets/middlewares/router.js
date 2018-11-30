import { Route } from '../decorator'

export default app => {
  const myroutes = new Route(app)
  myroutes.init()
}
