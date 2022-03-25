import React, { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/UserContext";

import TextField from "@mui/material/TextField";
import PrimaryButton from "../components/UI/PrimaryButton";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = useCallback(() => {
    dispatch({
      type: "LOGIN_USER",
      payload: { username: inputUsername, password: inputPassword },
    });
    navigate("/");
  }, [inputUsername, inputPassword]);

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
      <PrimaryButton onClick={loginHandler}>Login</PrimaryButton>
    </div>
  );
};

export default Login;
