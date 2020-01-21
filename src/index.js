import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this app
import ConsumerPage from "views/ConsumerPage.js";
import AppWrapper from "views/AppWrapper";
import ProducerPage from "views/ProducerPage.js";
import LoginPage from "views/LoginPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/homecooks/producer" component={ProducerPage} />
      <Route path="/homecooks/consumer" component={ConsumerPage} />
      <Route path="/homecooks/login-page" component={LoginPage} />
      <Route path="/homecooks/" component={AppWrapper} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
