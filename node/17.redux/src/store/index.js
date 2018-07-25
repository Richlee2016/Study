import redux from "@/redux";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
console.log(redux);
//浏览器 调试工具
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
// 这是一个可以帮你运行saga的中间件
let sagaMiddleware = createSagaMiddleware();
let store = redux.createState(
  reducers,
  { num: 0 },
  redux.applyMiddleware(sagaMiddleware)
//   composeEnhancers(
//       redux.applyMiddleware(sagaMiddleware)
//   )
);
// 通过中间件执行 或者说 运行 saga
sagaMiddleware.run(rootSaga, store);
export default store;
