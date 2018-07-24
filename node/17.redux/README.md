# redux

## why
1.状态是一个类似于全局变量，这样的写法不安全
2.增加修改的门栏 dispatch
```
function dispatch(){}
```
3.把状态隐藏 保护状态不能让外部修改
4.创建一个处理器 返回新状态
5.初始化 状态 并再内部触发dispatch
6.触发一个 订阅 与 发布  更新视图 并且 产生取消键(取消发布))
```
//333333//
function createStore(reducer){
    let state;
    function getSatate(){
        return JSON.parse(JSON.stringify(state));
    }
    //222222//
    function dispatch(action){
        <!-- switch(action.type){
            case TEST:
            state.rich.name = 'rich'
            return {...state,rich:{...state.rich,color:action.color}};
        } -->
        state = reducer(state,action);
    }
    //555555//  触发状态返回 初始state
    dispatch({});
    return {
        appState,
        dispatch
    }
}

//初始化
let initState = {}

//444444//
//处理器 根据老的状态 和 动作 返回新状态
let reducer = function(state = initState,action){
    switch(action.type){
        case TEST:
            state.rich.name = 'rich'
            return {...state,rich:{...state.rich,color:action.color}};
        default:
            return state;
    }
}

let store = createStore(reducer);

store.getState(); //无法再外部直接更改 state
```

