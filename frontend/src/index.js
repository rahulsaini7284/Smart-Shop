import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "./bootstrap.min.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";

import { GoogleOAuthProvider } from "@react-oauth/google";

console.log(process.env.GOOGLE_CLIENT_ID);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="702079746320-aj5svabst6s2cstt92h59q4evatsg9iq.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
