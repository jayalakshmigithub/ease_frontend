import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
