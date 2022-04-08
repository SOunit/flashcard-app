import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import CreateCardButton from "../components/UI/CreateCardButton";
import Button from "@mui/material/Button";

const Home = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(auth.isLoggedIn);

  return (
    <div className="home-menu">
      <CreateCardButton />
      {auth.isLoggedIn && (
        <>
          <Button onClick={() => navigate("/cards")}>Your Cards</Button>
          <Button>Search Cards</Button>
        </>
      )}
    </div>
  );
};

export default Home;
