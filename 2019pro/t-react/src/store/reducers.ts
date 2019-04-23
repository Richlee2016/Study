import * as redux from 'redux';
import count from '../views/Count/model/reducer';
import todo from '../views/Todo/model/reducer';

export default redux.combineReducers({
    count,
    todo,
});
