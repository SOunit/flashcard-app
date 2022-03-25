import React, { memo } from "react";
import Button from "@mui/material/Button";

const PrimaryButton = memo(props => {
  return (
    <Button variant="contained" sx={{ margin: "15px" }} onClick={props.onClick}>
      {props.children}
    </Button>
  );
});

export default PrimaryButton;
