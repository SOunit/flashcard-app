import React from "react";
import { useNavigate } from "react-router-dom";

import CreateCardButton from "../components/UI/CreateCardButton";
import Button from "@mui/material/Button";

const Home = () => {
  const loggedInOption = (
    <>
      <Button
        color="primary"
        sx={{ width: "200px" }}
        onClick={() => navigate("/cards")}
      >
        Your Cards
      </Button>
      <div className="spacer-sm" />
      <Button disabled sx={{ width: "200px" }}>
        Search Cards
      </Button>
    </>
  );

  const navigate = useNavigate();

  return (
    <div className="section-container center-col">
      <CreateCardButton />
      <div className="spacer-sm" />
      {loggedInOption}
    </div>
  );
};


export default Home;
