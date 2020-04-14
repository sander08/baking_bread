import { CookieService } from "./CookieService";

export default class UserService {
  static getUserToken() {
    return CookieService.get("token");
  }
  static setUserToken(value: string) {
    CookieService.set("token", value);
  }
  static deleteUserToken() {
    CookieService.delete("token");
  }
}
