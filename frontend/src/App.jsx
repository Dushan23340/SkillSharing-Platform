import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header"; 
import UserList from "./Components/UserList";
import PostList from "./Components/PostList";
import Home from "./Components/pages/Home";
import LoginPage from "./Components/pages/Login";
import SignupPage from "./Components/pages/Signup";

const App = () => {
  return (
    <Router>
       <Header />  {/* Header is always visible */}
       <div className="pt-16">  {/* Add padding to avoid overlap */}
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

        </Routes>
    </div>
    </Router>
  );
};

export default App;
