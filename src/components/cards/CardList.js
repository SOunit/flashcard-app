import React from "react";
import FlashCard from "./FlashCard";

const CardList = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return <div>No cards yet</div>;
  }

  return cards && cards.map(card => <FlashCard key={card.id} {...card} />);
};

export default CardList;
