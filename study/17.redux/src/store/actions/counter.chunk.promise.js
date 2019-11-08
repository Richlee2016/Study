import * as types from "@/store/action-types";
import { resolve } from "url";
export default {
  incerment() {
    return { type: types.INCERMENT };
  },
  decerment() {
    return { type: types.DECERMENT };
  },
  // 过一秒 redux-chunk
  timeAdd() {
    return function(dispatch,getState){
      setTimeout(() => {
        dispatch({ type: types.INCERMENT})
      },1000)
    }
  },
  // promise  但不能处理 reject   redux-promise
  promiseAdd(){
    return new Promise((resolve,reject) => {
      setTimeout(()=>{
        resolve({ type: types.DECERMENT })
      },1000)
    })
  }
};
