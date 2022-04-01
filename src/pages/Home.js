import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/UserContext";

import Layout from "../components/Layout/Layout";
import CreateCardButton from "../components/UI/CreateCardButton";
import Button from "@mui/material/Button";

const Home = () => {
  const { userState } = useContext(UserContext);

  const loggedInOption = (
    <>
      <Button onClick={() => navigate("/cards")}>Your Cards</Button>
      <Button>Search Cards</Button>
    </>
  );

  const navigate = useNavigate();

  return (
    <Layout>
      <CreateCardButton />
      {userState.username !== "guest" && loggedInOption}
    </Layout>
  );
};

export default Home;
