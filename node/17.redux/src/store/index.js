import redux from "@/redux";
import reducers from "./reducers"
let store = redux.createState(reducers);

export default store;
