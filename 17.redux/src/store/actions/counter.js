import * as types from "@/store/action-types";
import { resolve } from "url";
export default {
  incerment() {
    return { type: types.INCERMENT };
  },
  decerment() {
    return { type: types.DECERMENT };
  },
  asyncAdd() {
    return { type: types.ADD_ASYNC };
  }
};
