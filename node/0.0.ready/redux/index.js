import React from "react";
import ReactDom from "react-dom";
import Count from "./components/Count";
import { Provider } from "./react-redux";
import store from './store'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Count />
        </div>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
