import React from "react";
import { useNavigate } from "react-router-dom";

import CreateCardButton from "../components/UI/CreateCardButton";
import MenuButton from "../components/UI/MenuButton";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="section-container center-col">
      <MenuButton onClick={() => navigate("/new")}>
        Create a New Card
      </MenuButton>
      <div className="spacer-sm" />
      <MenuButton onClick={() => navigate("/cards")}>Your Cards</MenuButton>
      <div className="spacer-sm" />
      <MenuButton>Search Cards</MenuButton>
      <div className="spacer-sm" />
      <MenuButton>Shuffle Cards</MenuButton>
    </div>
  );
};


export default Home;
