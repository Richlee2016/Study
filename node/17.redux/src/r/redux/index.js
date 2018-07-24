function createStore(reducer){
    let state;
    let listeners = [];
    function getState(){
        return JSON.parse(JSON.stringify(state));
    }

    function dispatch(action){
        state = reducer(state,action);
        console.log(state);
        listeners.forEach(sub => sub());
    }

    dispatch({type:"@/init"})

    function subscribe(sub){
        listeners.push(sub);
        return function(){
            listeners.filter(sub => sub != sub);
        }
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}

function createActions(){

}
/**
 * {count:{num:0}}
 * 
 * 原来是 {num:0}  ====》 {count:{num:0}}
 */
function bindReducers(reducers){
    return function(state = {},action){
        return Object.keys(reducers).reduce((newState,key) => {
            //分发了 reducer 并且把state 分类
            newState[key] = reducers[key](state[key],action);
            return newState;
        },{})
    }
}

export {createStore,createActions,bindReducers}