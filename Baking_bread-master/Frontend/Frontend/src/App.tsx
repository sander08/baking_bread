import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import UserService from "./services/UserService";
import Login from "./views/Login";
import WorkBoard from "./views/WorkBoard";

import "./styles/App.scss";

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/main" />} />
      <Route
        exact
        path="/workboard"
        render={() => {
          const token = UserService.getUserToken();
          return token ? <WorkBoard /> : <Redirect to="/login" />;
        }}
      />
      <Route
        exact
        path="/login"
        render={() => {
          const token = UserService.getUserToken();
          return token ? <Redirect to="/workboard" /> : <Login />;
        }}
      />
      <Route path="/*" render={() => <Redirect to="/workboard" />} />
    </Switch>
  );
};
export default App;
