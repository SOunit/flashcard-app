import React from "react";

const UserContext = React.createContext({
  username: "",
  password: "",
});

export default UserContext;
