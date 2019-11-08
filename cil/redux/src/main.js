/*
 * @Date: 2019-05-08 09:04:57
 * @LastEditors: RichLee
 * @LastEditTime: 2019-05-08 09:04:57
 */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch } from "react-router-dom";
import { createHashHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import App from "@/views/App";
import Store from "@/store";

const history = createHashHistory();

ReactDOM.render(
  <Provider store={Store()}>
    <ConnectedRouter history={history}>
      <Switch>
        <App />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app")
);
