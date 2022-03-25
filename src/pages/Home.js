import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

import Button from "@mui/material/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Button
        variant="outlined"
        sx={{
          margin: "20px",
        }}
        onClick={() => navigate("/new")}
      >
        Create a new card
      </Button>
    </Layout>
  );
};

export default Home;
