import { useReducer } from "react";
import UserContext from "./UserContext";

const initialUserState = {
  username: "guest",
  password: "guest",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        username: action.payload.username,
        password: action.payload.password,
      };

    case "LOGOUT_USER":
      return {
        username: "guest",
        password: "guest",
      };

    default:
      return state;
  }
};

const UserContextProvider = props => {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
