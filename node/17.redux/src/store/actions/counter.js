import * as types from "@/store/action-types";
export default {
  incerment() {
    return { type: types.INCERMENT };
  },
  decerment() {
    return { type: types.DECERMENT };
  }
};
