import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../util/validators";
import { useForm } from "../hooks/use-form";
import InputForm from "../components/FormElements/InputForm";
import FormButton from "../components/FormElements/FormButton";
import PrimaryButton from "../components/UI/PrimaryButton";

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const loginHandler = event => {
    event.preventDefault();
    auth.login();
    navigate("/home");
  };

  const modeChangeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          username: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: { value: "", isValid: false },
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <div>
      <h1>Login Required</h1>
      {!isLoginMode && (
        <InputForm
          id="username"
          label="Username"
          type="text"
          errorText="Username is required"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
      )}
      <InputForm
        id="email"
        label="Email"
        type="email"
        errorText="Seems like invalid email"
        validators={[VALIDATOR_EMAIL()]}
        onInput={inputHandler}
      />
      <InputForm
        id="password"
        label="Password"
        type="password"
        errorText="Password should be min 6 letters"
        validators={[VALIDATOR_MINLENGTH(6)]}
        onInput={inputHandler}
      />

      <FormButton onClick={loginHandler} disabled={!formState.isValid}> 
        {isLoginMode ? "LOGIN" : "SIGNUP"}
      </FormButton>
      <p>You don't have an account?</p>
      <PrimaryButton onClick={modeChangeHandler}>
        {isLoginMode ? "SIGNUP" : "LOGIN"}
      </PrimaryButton>
    </div>
  );
};

export default Auth;
