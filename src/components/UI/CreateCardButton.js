import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const CreateCardButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant="outlined" onClick={() => navigate("/new")}>
      Create a new card
    </Button>
  );
};

export default CreateCardButton;
