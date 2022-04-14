import React from "react";
import "./MenuButton.css";

const MenuButton = ({ onClick, children }) => {
  return (
    <button className="menu-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default MenuButton;
