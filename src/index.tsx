import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import i18n from "translation/i18next";
import App from "./App";
import { store } from "./app/store";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { history } from "./utils";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
