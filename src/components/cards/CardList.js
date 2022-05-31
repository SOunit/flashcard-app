import React from "react";
import FlashCard from "./FlashCard";

const CardList = ({ cards }) => {
  return cards && cards.map(card => <FlashCard key={card.id} {...card} />);
};

export default CardList;
