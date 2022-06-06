import React from "react";
import { Link } from "react-router-dom";

import lightBulb from "../assets/icons/lightbulb.png";
import Button from "../components/UI/Button";

const Home = () => {
  return (
    <>
      <div className="bg-primary px-9 py-24 sm:py-28 md:py-32 rounded-b-lg">
        <div className="FlexCenter flex-col text-center">
          <h1 className="text-emerald-50">Welcome to FLASH</h1>
          <img src={lightBulb} alt="lightbulb" className="my-3" />
          <h2 className="text-emerald-50 mx-10">Enlighten Yourself With New Words</h2>
        </div>
      </div>
      <div className="FlexColumn my-8 md:my-12">
        <Link to="/login">
          <Button className="h-12 my-2 px-20 sm:px-36" content="LOG IN" />
        </Link>
        <Link to="/signup">
          <Button className="h-12 my-2 px-20 sm:px-36" content="SIGN UP" />
        </Link>
      </div>
    </>
  );
};

export default Home;
