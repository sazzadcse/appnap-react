import React from 'react';
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import { GET_COOKIE, GET_STORAGE, SET_STORAGE, USER, API_KEY, REFER_URL, DELETE_LOGIN_COOKIE, REMOVE_STORAGE, AJAX_PUBLIC_REQUEST, DISTRIBUTOR_URL, AJAX_REQUEST, AJAX_SERVICE_LOGIN_REQUEST } from "../src/Constants/AppConstants";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import reducer from "./Store/reducers/reducer";
import { setCurrentUser } from "./Store/actions/loginActions";
import history from "./history";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

const cur_cookie = GET_COOKIE(USER);
if (cur_cookie) {
    const cur_cookie_parse = JSON.parse(GET_COOKIE(USER));
    SET_STORAGE(USER, JSON.stringify(cur_cookie_parse));
}

const cur_storage = JSON.parse(GET_STORAGE(USER));

if (cur_storage) {
    if (cur_storage.token) {

      SET_STORAGE(USER, JSON.stringify(cur_storage));
      store.dispatch(setCurrentUser(JSON.parse(GET_STORAGE(USER))));

    } else {
        REMOVE_STORAGE(USER);
        store.dispatch(setCurrentUser({}));
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
