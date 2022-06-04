import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { CardProvider } from "./context/card-context";
import { AuthContext } from "./context/auth-context";

import Home from "./pages/Home";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Auth from "./pages/Auth";
import Cards from "./pages/Cards";
import MyCardList from "./pages/MyCardList";
import CreateCard from "./pages/CreateCard";
import EditCard from "./pages/EditCard";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useContext(AuthContext);

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthContextProvider>
      <CardProvider>
        <Header />
        <main>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth isLoginModeProp={true} />} />
              <Route
                path="/signup"
                element={<Auth isLoginModeProp={false} />}
              />
              <Route
                path="/new"
                element={
                  <ProtectedRoute>
                    <CreateCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cards/*"
                element={
                  <ProtectedRoute>
                    <Cards />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-cards"
                element={
                  <ProtectedRoute>
                    <MyCardList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cards/:cid/edit"
                element={
                  <ProtectedRoute>
                    <EditCard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </main>
        <Footer />
      </CardProvider>
    </AuthContextProvider>
  );
};

export default App;
