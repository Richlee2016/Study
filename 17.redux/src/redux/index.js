function createState(reducer, preloadedState, enchancer) {
  let state = preloadedState;
  let listeners = [];

  if (enchancer && typeof enchancer == "function") {
    return enchancer(createState)(reducer, preloadedState);
  }

  function getState() {
    return JSON.parse(JSON.stringify(state));
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(l => l());
  }
  function subscribe(sub) {
    listeners.push(sub);
    return function() {
      listeners = listeners.filter(item => item != sub);
    };
  }
  //初始化  防止 action 为undefind
  dispatch({ type: "@/INIT" });
  return {
    getState,
    dispatch,
    subscribe
  };
}

import bindActionCreators from "./bindActionCreators";
import combineReducers from "./combineReducers";
import applyMiddleware from "./applyMiddleware";
import compose from "./compose";
export default {
  bindActionCreators,
  combineReducers,
  createState,
  applyMiddleware,
  compose
};
