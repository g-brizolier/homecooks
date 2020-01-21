import React, {Component} from "react";
import { Redirect, Route } from 'react-router-dom';
import HomePage from "views/Components/HomePage.js";

function isLoggedIn() {
    return localStorage.getItem("mateub") != null;
}

class AppWrapper extends Component{
  render(){

  if(!isLoggedIn())
    return <Redirect to="/login-page" />

   return(
     <React.Fragment>
       <Route path='/' component={HomePage} />
     </React.Fragment>
   );
  }
}

export default AppWrapper;