import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
import { store } from './utils/Redux/store.js'
import { Provider } from 'react-redux'
import { ProSidebarProvider } from "react-pro-sidebar";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={store}>
    
    <App />
    {/* </ProSidebarProvider> */}
    </Provider>
   
    
   
  </React.StrictMode>,
)
