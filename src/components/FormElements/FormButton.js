import React from "react";

import Button from "@mui/material/Button";

const FormButton = ({ children, disabled }) => {
  if (disabled === true) {
    return (
      <Button variant="contained" disabled>
        {children}
      </Button>
    );
  }
  return <Button variant="contained">{children}</Button>;
};

export default FormButton;
