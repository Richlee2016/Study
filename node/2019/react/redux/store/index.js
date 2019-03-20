import { createStore } from '../redux'
import reducers from './reducers/index'
const Store = createStore(reducers)

export default Store
