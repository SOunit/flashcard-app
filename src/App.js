import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from "./store/UserContextProvider";
import CardContextProvider from "./store/CardContextProvider";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateCard from "./pages/CreateCard";

const App = () => {
  return (
    <UserContextProvider>
      <CardContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new" element={<CreateCard />} />
          </Routes>
        </Router>
      </CardContextProvider>
    </UserContextProvider>
  );
};

export default App;
