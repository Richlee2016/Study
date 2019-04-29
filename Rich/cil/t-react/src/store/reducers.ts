import * as redux from 'redux';
import count from '../views/Count/model/reducer';
import group from '../views/Group/model/reducer';
import {connectRouter} from 'connected-react-router';
import { createHashHistory } from 'history';
const history = createHashHistory();
export default redux.combineReducers({
    router: connectRouter(history),
    count,
    group,
});
