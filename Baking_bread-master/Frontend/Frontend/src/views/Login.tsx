import React from "react";
import { inject, observer } from "mobx-react";

import Input from "../components/Input";
import Button from "../components/Button";

import "../styles/views/Login.scss";

const Login: React.FC = inject("LoginStore")(
  observer(({ LoginStore }: any) => {
    return (
      <div className="Login">
        <div className="Login__form">
                <h1>BAKING BREAD</h1>
          <form>
            <Input
              type="text"
              name="Login"
              placeholder="Login"
              style={{ width: "100%", height: "32px" }}
              value={LoginStore.login}
              onChange={(e) => {
                LoginStore.onLoginChange(e.target.value);
              }}
            />
            <Input
              type="password"
              name="Password"
              placeholder="Password"
              style={{ width: "100%", height: "32px" }}
              value={LoginStore.password}
              onChange={(e) => {
                LoginStore.onPasswordChange(e.target.value);
              }}
            />
            <div className="Login__form__message">{LoginStore.message}</div>
            <Button
              text="Log In"
              style={{ width: "100%", height: "32px" }}
              onClick={() => {
                LoginStore.handleLogIn();
              }}
            />
          </form>
        </div>
      </div>
    );
  })
);

export default Login;
