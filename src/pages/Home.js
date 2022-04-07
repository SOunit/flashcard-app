import React from "react";
import { useNavigate } from "react-router-dom";

import CreateCardButton from "../components/UI/CreateCardButton";
import Button from "@mui/material/Button";

const Home = () => {
  const loggedInOption = (
    <>
      <Button onClick={() => navigate("/cards")}>Your Cards</Button>
      <Button>Search Cards</Button>
    </>
  );

  const navigate = useNavigate();

  return (
    <>
      <CreateCardButton />
      {loggedInOption}
    </>
  );
};

export default Home;
