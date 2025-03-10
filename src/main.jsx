import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./utils/Redux/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { SocketProvider } from "./utils/context/SocketProvider.jsx";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa',
    },
    background: {
      default: '#0f172a', 
      paper: '#1e293b', 
    },
    grey: {
      700: '#334155', 
      800: '#1e293b', 
      900: '#0f172a', 
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  
  
  
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
  
    
        <App />
      
        <ToastContainer/>
        </SocketProvider>
     
    </Provider>
  </React.StrictMode>
);
