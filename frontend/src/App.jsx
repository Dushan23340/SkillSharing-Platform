import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./Components/UserList";
import PostList from "./Components/PostList";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Skill Sharing Platform</h1>
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/posts" element={<PostList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
