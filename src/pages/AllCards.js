import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import CardList from "../components/cards/CardList";
import CreateCardButton from "../components/UI/CreateCardButton";
import { CardContext } from "../context";

const AllCards = () => {
  const {
    data: loadedCards,
    error,
    status,
    dispatch,
  } = useContext(CardContext);

  useEffect(() => {
    if(!loadedCards){
      dispatch({ type: "GET_ALL_CARDS" })
    }
  }, []);

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
    <Layout>
      <CreateCardButton />
      {content}
      <Link to="/">Go back</Link>
    </Layout>
  );
};

export default AllCards;
