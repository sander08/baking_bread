import { types } from "mobx-state-tree";
import { routingStore } from "../index";
import ApiClient from "../services/ApiClient";
import FieldValidator from "../services/FieldValidator";
import UserService from "../services/UserService";
import { CookieService } from "../services/CookieService";

const LoginStore = types
  .model({
    login: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    message: types.optional(types.string, ""),
  })
  .actions((self) => ({
    handleLogIn() {
      if (
        FieldValidator.isNotEmpty(self.login) &&
        FieldValidator.isNotEmpty(self.password)
      ) {
        let data = new FormData();
        data.append("login", self.login);
        data.append("password", self.password);

        ApiClient.post("/api/Customer/Login", data)
          .then((res) => {
            UserService.setUserToken(res.data.c_ID);
            CookieService.set("role", res.data.type);
            self.reset();
            routingStore.push("/workboard");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleLogOut() {
      CookieService.delete("role");
      UserService.deleteUserToken();
      routingStore.push("/login");
    },
    onLoginChange(value) {
      self.login = value;
    },
    onPasswordChange(value) {
      self.password = value;
    },
    setMessage(value) {
      self.message = value;
    },
    reset() {
      self.login = "";
      self.password = "";
      self.message = "";
    },
  }));

export default LoginStore.create();
