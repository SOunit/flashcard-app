import React, { useContext } from "react";
import CardContext from "../store/CardContext";
import { Link } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import CardList from "../components/cards/CardList";
import CreateCardButton from "../components/UI/CreateCardButton";

const AllCards = () => {
  const { cardState } = useContext(CardContext);
  console.log(cardState.cards);

  return (
    <Layout>
      <CreateCardButton />
      <CardList cards={cardState.cards} />
      <Link to="/">Go back</Link>
    </Layout>
  );
};

export default AllCards;
