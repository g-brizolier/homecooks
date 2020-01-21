import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ConsumerPage from "views/Components/ConsumerPage.js";
import AppWrapper from "views/Components/AppWrapper";
import ProducerPage from "views/Components/ProducerPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/homecooks/landing-page" component={LandingPage} />
      <Route path="/homecooks/profile-page" component={ProfilePage} />
      <Route path="/homecooks/producer" component={ProducerPage} />
      <Route path="/homecooks/consumer" component={ConsumerPage} />
      <Route path="/homecooks/login-page" component={LoginPage} />
      <Route path="/homecooks/components" component={Components} />
      <Route path="/homecooks" component={AppWrapper} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
