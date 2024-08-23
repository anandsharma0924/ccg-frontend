import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./Conponent/HomePage";
import ChooseUser from "./Conponent/ChooseUser";
import Login from "./Conponent/Login";
import AdminDashboard from "./Admin/AdminDashboard";

import Logout from "./Admin/Logout"; // Import Logout component
import TeacherDashboard from "./Teacher/TeacherDashboard";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<ChooseUser />} />

          {/* Login routes */}
          <Route path="/Adminlogin" element={<Login role="Admin" />} />
          <Route path="/Studentlogin" element={<Login role="Student" />} />
          <Route path="/Teacherlogin" element={<Login role="Teacher" />} />

          {/* Dashboard routes */}
          <Route path="/Admin/dashboard" element={<AdminDashboard />} />
          <Route path="/Teacher/dashboard" element={<TeacherDashboard />} />

          {/* Logout route */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
