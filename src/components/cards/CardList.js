import React from "react";
import Card from "./FlashCard";

const CardList = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return <div>No cards yet</div>;
  }

  return cards.map(card => <Card key={card.id} {...card} />);
};

export default CardList;
