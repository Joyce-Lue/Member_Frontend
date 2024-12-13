import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./styles/memberAll.css";

import Member from "./page/member";
import Login from "./page/memberLogin/login.jsx";
import ForgetPassword from "./page/ForgetPassword.jsx";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/member" component={Member} />
        <Route path="/login" component={Login} />
        <Route path="/forgetPassword" component={ForgetPassword} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
