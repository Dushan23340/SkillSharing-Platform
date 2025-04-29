import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header"; 
import Home from "./Components/pages/Home";
import LoginPage from "./Components/pages/Login";
import SignupPage from "./Components/pages/Signup";
import UserProfile from "./Components/Pages/UserProfile";

const App = () => {
  return (
    <Router>
       <Header />  {/* Header is always visible */}
       <div className="pt-16">  {/* Add padding to avoid overlap */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/userProfile" element={<UserProfile />} />

        </Routes>
    </div>
    </Router>
  );
};

export default App;
