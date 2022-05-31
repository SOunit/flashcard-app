import React from "react";
import classes from "./MenuButton.module.css";

const MenuButton = ({ onClick, children }) => {
  return (
    <button className={classes["menu-button"]} onClick={onClick}>
      {children}
    </button>
  );
};

export default MenuButton;
