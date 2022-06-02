import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../util/validators";
import { useForm } from "../hooks/use-form";
import InputForm from "../components/FormElements/InputForm";
import Button from "../components/UI/Button";

const Auth = ({ isLoginModeProp }) => {
  const navigate = useNavigate();
  const { logIn, signUp, dispatch, authUser } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState();
  const [error, setError] = useState("");
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    setIsLoginMode(isLoginModeProp);
  }, []);

  const logInHandler = async event => {
    event.preventDefault();
    setError("");
    try {
      await logIn(
        formState.inputs.email.value,
        formState.inputs.password.value
      );
      setIsLoginMode(true);
      navigate("/cards");
    } catch (err) {
      setError(err.message);
    }
  };

  const signUpHandler = async event => {
    event.preventDefault();
    setError("");
    try {
      await signUp(
        formState.inputs.email.value,
        formState.inputs.password.value,
        formState.inputs.username.value
      );

      if (authUser) {
        dispatch({
          type: "ADD_USER",
          payload: {
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
          },
        });
      } else {
        console.log("failed to add a user to db");
      }
      navigate("/cards");
    } catch (err) {
      setError(err.message);
    }
  };

  const modeChangeHandler = () => {
    setError("");
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
    <div className="WhiteContainer shadow-md">
      {!isLoginMode ? (
        <h1 className="text-center">Sign Up</h1>
      ) : (
        <h1 className="text-center">Log In</h1>
      )}
      {error && <h2>{error}</h2>}
      <div className="FlexColumn w-full px-5 sm:px-10 xl:px-20">
        {!isLoginMode && (
          <InputForm
            id="username"
            label="User name"
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

        <div className="FlexColumn sm:flex-row my-5">
          {!isLoginMode ? (
            <Button
              onClick={signUpHandler}
              disabled={!formState.isValid}
              content="SIGN UP"
              className="px-8 mx-3 mt-5"
            />
          ) : (
            <Button
              onClick={logInHandler}
              disabled={!formState.isValid}
              content="LOG IN"
              className="px-8 mx-3 mt-5"
            />
          )}

          {!isLoginMode ? (
            <Button
              onClick={modeChangeHandler}
              content="You already have an account? LOG IN"
              className="mt-5 bg-accent bg-opacity-50 text-orange-500"
            />
          ) : (
            <Button
              onClick={modeChangeHandler}
              content="You don't have an account? SIGN UP"
              className="mt-5 bg-accent bg-opacity-50 text-orange-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
