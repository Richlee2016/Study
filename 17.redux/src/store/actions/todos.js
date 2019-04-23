import * as types from "@/store/action-types";

export default {
  addTodo: (...arg) => ({ types: types.ADD_TODO, arg }),
  delTodo: index => ({ types: types.DEL_TODO, index }),
  togTodo: index => ({ types: types.TOG_TODO, index })
};
