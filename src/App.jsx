import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import AdminRouter from "./Routes/AdminRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import IncomingCallModal from "./Components/Chat/IncomingCallModal";
import { useSelector } from "react-redux";
import NotificationProvider from "./utils/context/NotificationProvider";
import Navbar from "./Components/Navbar/Navbar";




function App() {
  const user = useSelector((state)=>state.user?.userInfo?.user)
 
  return (
    <div className="App">
      <Router>
  { user && <IncomingCallModal user={user}/>}
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRouter/>}/>
        </Routes>
      </Router>
      <ToastContainer autoClose={1000} />
     
      
    </div>
  );
}

export default App;
