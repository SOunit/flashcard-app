import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from "./store/UserContextProvider";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateCard from "./pages/CreateCard";
import AllCards from "./pages/AllCards";
import EditCard from "./pages/EditCard";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<CreateCard />} />
          <Route path="/cards/*" element={<AllCards />} />
          <Route path="/cards/:cid/edit" element={<EditCard />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
