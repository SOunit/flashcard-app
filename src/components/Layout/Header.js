import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const { logOut, authUser } = useContext(AuthContext);

  const logoutHandler = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ height: "1.5rem" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FLASH {authUser && authUser.email}
          </Typography>
          {authUser && (
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
