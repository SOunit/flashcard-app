import React, { useState, useCallback } from "react";
import FlashCard from "./FlashCard";

const CardList = ({ cards }) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  if (!cards || cards.length === 0) {
    return <div>No cards yet</div>;
  }

  return cards.map(card => (
    <FlashCard onForceUpdate={forceUpdate} key={card.id} {...card} />
  ));
};

export default CardList;
