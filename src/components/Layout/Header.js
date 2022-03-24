import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/UserContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const { userState, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT_USER" });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello! {userState.username}
          </Typography>
          {userState.username === "guest" ? (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
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
