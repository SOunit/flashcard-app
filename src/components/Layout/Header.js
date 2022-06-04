import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "../UI/Button";

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
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            FLASH
          </Typography>
          <Typography
            component="div"
            sx={{ textAlign: "right", mx: 1, flexGrow: 1 }}
          >
            {authUser && authUser.email}
          </Typography>
          {authUser && (
            <Button
              color="inherit"
              onClick={logoutHandler}
              content="LOG OUT"
              className="text-emerald-50"
            ></Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
