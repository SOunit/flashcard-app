import React from "react";

import Search from "../../assets/icons/search.png";

const NoResultsFound = () => {
  return (
    <div className="FlexCenter text-center my-10">
      <h2>No Results Found... Please try again!</h2>
      <img src={Search} className="h-12 w-auto ml-2" />
    </div>
  );
};

export default NoResultsFound;
