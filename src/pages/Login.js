import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/UserContext";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = () => {
    dispatch({
      type: "LOGIN_USER",
      payload: { username: inputUsername, password: inputPassword },
    });
    navigate("/");
  };

  return (
    <div>
      <h1>Log in</h1>
      <TextField
        required
        id="standard-required"
        label="User name"
        type="text"
        variant="standard"
        onChange={e => {
          setInputUsername(e.target.value);
        }}
      />
      <TextField
        required
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="standard"
        onChange={e => {
          setInputPassword(e.target.value);
        }}
      />
      <Button variant="contained" onClick={loginHandler}>
        Login
      </Button>
    </div>
  );
};

export default Login;
