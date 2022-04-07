import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import PrimaryButton from "../components/UI/PrimaryButton";

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const loginHandler = event => {
    event.preventDefault();
    auth.login();
    navigate("/home");
  };

  return (
    <div>
      <h1>Login Required</h1>
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
      <p>You don't have an account?</p>
      <PrimaryButton>Sign Up</PrimaryButton>
    </div>
  );
};

export default Auth;
