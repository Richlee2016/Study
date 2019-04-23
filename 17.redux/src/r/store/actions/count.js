import * as types from "@/r/store/action-types";

export default {
  add() {
    return { type: types.ADD };
  },
  minus() {
    return { type: types.MINUS };
  }
};
