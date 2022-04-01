import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const CreateCardButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      sx={{
        margin: "20px",
      }}
      onClick={() => navigate("/new")}
    >
      Create a new card
    </Button>
  );
};

export default CreateCardButton;