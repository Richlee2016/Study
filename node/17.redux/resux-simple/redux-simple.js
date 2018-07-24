const HANDLE_NAME = "HANDLE_NAME";
const HANDLE_COLOR = "HANDLE_COLOR";

function createState(reducer) {
  let state;
  let listeners = []  
  function getState() {
    return JSON.parse(JSON.stringify(state));
  }

  function dispatch(action) {
    state = reducer(action,state);
    //发布
    listeners.forEach(l => l());
  }

  function subscribe(sub){
      //订阅
      listeners.push(sub);
      //返回一个 取消订阅
      return function(){
          listeners = listeners.filter(item => item != sub);
      }
  }

  dispatch({});

  return {
    getState,
    dispatch,
    subscribe
  };
}
let initState = {
    name: "rich",
    color: "red"
  }

let store = createState(reducer);
//返回一个新值
function reducer(action,state = initState) {
  switch (action.type) {
    case HANDLE_NAME:
      return { ...state, name: "lee" };
    case HANDLE_COLOR:
      state.color = "green";
      return { ...state, color: "green" };
    default:
      return state;
  }
}

function render() {
  let state = store.getState();
  const el = document.querySelector("#app");
  el.innerHTML = state.name;
  el.style.color = state.color;
}

let unSub = store.subscribe(render);

setTimeout(() => {
  store.dispatch({ type: "HANDLE_NAME" });
  //派发完成 结束 订阅(停止键))
  unSub();
  store.dispatch({ type: "HANDLE_COLOR" });
}, 1000);

render();

