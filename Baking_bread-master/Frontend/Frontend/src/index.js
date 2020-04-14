import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
// import { reaction } from "mobx";
import { Router } from "react-router-dom";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import RootStore from "./stores/RootStore";
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();
export const routingStore = new RouterStore();
const uHistory = syncHistoryWithStore(browserHistory, routingStore);

const stores = {
	routing: routingStore,
	RootStore: RootStore,
	LoginStore: RootStore.LoginStore,
	WorkBoardStore: RootStore.WorkBoardStore
}

ReactDOM.render(
	<Provider {...stores}>
		<Router history={uHistory} >
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
