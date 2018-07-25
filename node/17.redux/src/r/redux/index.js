function createStore(reducer){
    let state;
    let listeners = [];
    function getState(){
        return JSON.parse(JSON.stringify(state));
    }

    function dispatch(action){
        state = reducer(state,action);
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
/**
 * {add:function(return {type:ADD},minus:function(return {type:MINUS})
 * ||
 * ||
 * ||
 * {add:() => dispatch({type:ADD}),minus:() => dispatch({type:MINUS})
 */
function createActions(actions,dispatch){
    let newActions = {};
    for(let key in actions){
        let action = actions[key];
        newActions[key] = () => dispatch(action.apply(newActions,arguments));
    }
    return newActions;
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