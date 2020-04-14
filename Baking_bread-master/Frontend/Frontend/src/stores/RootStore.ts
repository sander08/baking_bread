import LoginStore from "./LoginStore";
import WorkBoardStore from './WorkBoardStore';

class RootStore {
  LoginStore: any;
  WorkBoardStore: any;

  constructor() {
    this.LoginStore = LoginStore;
    this.WorkBoardStore = WorkBoardStore;
  }
}

export default new RootStore();
