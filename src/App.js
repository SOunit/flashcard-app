import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from "./store/UserContextProvider";

import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
