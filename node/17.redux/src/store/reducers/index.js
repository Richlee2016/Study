import redux from "@/redux"
import counter from './counter'
import todos from './todos'
export default redux.combineReducers({
    counter,
    todos
})