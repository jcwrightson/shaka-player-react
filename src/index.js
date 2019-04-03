import React from "react";
import ReactDOM from "react-dom";
import Home from "./views/Home";
import Single from "./views/Single";
import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/movie/:id" component={Single} />
      <Route component={() => <div>404 &mdash; Not Found</div>} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("app")
);
