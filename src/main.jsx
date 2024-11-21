import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./utils/Redux/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
// import { SocketProvider } from "./utils/context/SocketProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <SocketProvider> */}
        <App />
        <ToastContainer/>
      {/* </SocketProvider> */}
    </Provider>
  </React.StrictMode>
);
