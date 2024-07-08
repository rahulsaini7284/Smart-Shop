import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "./bootstrap.min.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";

import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
async function getId() {
  const { data } = await axios("/client_id");
  return data;
}
const client_id = await getId();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  client_id && (
    <GoogleOAuthProvider clientId={client_id}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
