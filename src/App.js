import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import { CardProvider } from "./context/card-context";

import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateCard from "./pages/CreateCard";
import AllCards from "./pages/AllCards";
import EditCard from "./pages/EditCard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new" element={<CreateCard />} />
        <Route path="/cards/*" element={<AllCards />} />
        <Route path="/cards/:cid/edit" element={<EditCard />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/home" element={<Navigate to="/auth" />} />
        <Route path="/cards/*" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <CardProvider>
        <Header />
        <main>
          <Router>{routes}</Router>
        </main>
      </CardProvider>
    </AuthContext.Provider>
  );
};

export default App;
