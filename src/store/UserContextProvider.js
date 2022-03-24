import { useReducer } from "react";
import { UserContext } from "./UserContext";

const initialUserState = {
  username: "",
  password: "",
};

const UserReducer = (state, action) => {};

const UserContextProvider = props => {
  return <UserContext.Provider>{props.children}</UserContext.Provider>;
};
