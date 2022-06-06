import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

import Button from "../UI/Button";

const Header = () => {
  const { logOut, authUser } = useContext(AuthContext);

  const logoutHandler = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-primary text-emerald-50 h-16 flex items-center justify-between px-3 py-2">
      <h2 className="tracking-wider font-bold">
        {authUser ? <a href="/cards">FLASH</a> : <a href="/">FLASH</a>}
      </h2>
      <div className="FlexCenter">
        <h4 className="text-right mx-1">{authUser && authUser.email}</h4>
        {authUser && (
          <Button
            color="inherit"
            onClick={logoutHandler}
            content="LOG OUT"
            className="text-emerald-50"
          ></Button>
        )}
      </div>
    </header>
  );
};

export default Header;
