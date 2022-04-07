import React, { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { getCards } from "../api/api";
import { Link } from "react-router-dom";

import CardList from "../components/cards/CardList";
import CreateCardButton from "../components/UI/CreateCardButton";

const AllCards = () => {
  const {
    sendRequest,
    data: loadedCards,
    error,
    status,
  } = useHttp(getCards, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let content;
  if (status === "pending") {
    content = (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    content = { error };
  }

  if (status === "completed" && (!loadedCards || loadedCards.length === 0)) {
    content = (
      <div>
        <h1>No cards found</h1>
      </div>
    );
  }

  content = <CardList cards={loadedCards} />;

  return (
    <>
      <CreateCardButton />
      {content}
      <Link to="/">Go back</Link>
    </>
  );
};

export default AllCards;
