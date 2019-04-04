import React from "react";
import ReactDOM from "react-dom";
import Home from "./views/Home";
import Single from "./views/Single";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { syncHistoryWithStore } from "react-router-redux";

import store from "./store";

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/movie/:id' component={Single} />
        <Route component={() => <div>404 &mdash; Not Found</div>} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
