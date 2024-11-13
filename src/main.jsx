import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./utils/Redux/store.js";
import { Provider } from "react-redux";
// import { SocketProvider } from "./utils/context/SocketProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <SocketProvider> */}
        <App />
      {/* </SocketProvider> */}
    </Provider>
  </React.StrictMode>
);
