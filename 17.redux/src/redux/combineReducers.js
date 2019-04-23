export default function combineReducers(reducers){
    return function (state = {},action){
        return Object.keys(reducers).reduce((newState,key) => {
            //返回一个集合 reducer的新值  dispath type的时候  新的值就更新到 newState上了
            /**
             * switch(action.type){
             *      case ADD:
             *          ...
             *      case MINUS:
             *          ...
             *          .   
             *          .
             *          .
             * }
             */
            /**
             * counter reducer  state = {num:1}  
             * todos reducer   state = {items:[]}
             * ||
             * ||
             * newState {count:{num:1},todos:{items:[]}}
             */
            console.log(state[key]);
            newState[key] = reducers[key](state[key],action);
            return newState;
        },{})
    }
}