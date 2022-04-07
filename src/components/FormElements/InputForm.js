import React, { useReducer, useEffect } from "react";
import { validate } from "../../util/validators";

import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };

    case "TOUGH":
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

const InputForm = ({
  id,
  label,
  type,
  initValue,
  initIsValid,
  errorText,
  onInput,
  validators,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initValue || "",
    isTouched: false,
    isValid: initIsValid || false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid]);

  const changeHandler = event => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUGH",
    });
  };

  const inputContent = (
    <>
      <InputLabel
        htmlFor={`component-${
          !inputState.isValid && inputState.isTouched ? "simple" : "error"
        }`}
      >
        {label}
      </InputLabel>
      <Input
        id={`component-${
          !inputState.isValid && inputState.isTouched ? "simple" : "error"
        }`}
        value={inputState.value}
        type={type}
        onChange={changeHandler}
        onBlur={touchHandler}
      />
      {!inputState.isValid && inputState.isTouched && (
        <FormHelperText id="component-error-text">{errorText}</FormHelperText>
      )}
    </>
  );

  return !inputState.isValid && inputState.isTouched ? (
    <FormControl variant="standard" error sx={{ m: "0 12px" }}>
      {inputContent}
    </FormControl>
  ) : (
    <FormControl variant="standard" sx={{ m: "0 12px" }}>
      {inputContent}
    </FormControl>
  );
};

export default InputForm;
