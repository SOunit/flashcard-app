import React from "react";

import MenuOption from "./MenuOption";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import StyleIcon from "@mui/icons-material/Style";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Menu = ({ onShuffle }) => {
  const commonClassName =
    "FlexColumn text-white rounded-md w-24 sm:w-36 p-2 sm:p-5 mx-1 sm:mx-3 my-10 bg-opacity-80 hover:shadow transform hover:-translate-y-1 duration-300 cursor-pointer";

  return (
    <div className="FlexCenter my-5">
      <MenuOption
        className={`${commonClassName} bg-neutral`}
        icon={<ShuffleIcon color="white" />}
        content="shuffle"
        onClick={onShuffle}
      />
      <MenuOption
        className={`${commonClassName} bg-accent`}
        icon={<StyleIcon color="white" />}
        content="my cards"
        to="/my-cards"
      />
      <MenuOption
        className={`${commonClassName} bg-danger`}
        icon={<AddCircleIcon color="white" />}
        content="create"
        to="/new"
      />
    </div>
  );
};

export default Menu;
