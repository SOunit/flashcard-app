import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import PrimaryButton from "../components/UI/PrimaryButton";

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const loginHandler = event => {
    event.preventDefault();
    auth.login();
    navigate("/home");
  };

  const modeChangeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <div>
      <h1>Login Required</h1>
      {!isLoginMode && (
        <TextField
          required
          id="standard-required"
          label="Username"
          type="text"
          variant="standard"
          onChange={e => {
            setInputUsername(e.target.value);
          }}
          sx={{ m: "12px" }}
        />
      )}
      <TextField
        required
        id="standard-required"
        label="Email"
        type="email"
        variant="standard"
        onChange={e => {
          setInputEmail(e.target.value);
        }}
        sx={{ m: "12px" }}
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
        sx={{ m: "12px" }}
      />
      {isLoginMode ? (
        <>
          <PrimaryButton onClick={loginHandler}>Login</PrimaryButton>
          <p>You don't have an account?</p>
          <PrimaryButton onClick={modeChangeHandler}>Sign Up</PrimaryButton>
        </>
      ) : (
        <>
          <PrimaryButton onClick={loginHandler}>SignUp</PrimaryButton>
          <p>You already have an account?</p>
          <PrimaryButton onClick={modeChangeHandler}>Login</PrimaryButton>
        </>
      )}
    </div>
  );
};

export default Auth;
