import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CardContext } from "../../context/card-context";

import Button from "../UI/Button";

const FlashCard = ({ id: cardId, front, back, example, comment, level }) => {
  const [isBack, setIsBack] = useState(false);
  const { dispatch } = useContext(CardContext);

  const cardFlipHandler = () => {
    setIsBack(!isBack);
  };

  const deleteHandler = cardId => {
    dispatch({ type: "DELETE_CARD", payload: cardId });
  };

  return (
    <div className="Card shadow-md border-4 border-x-0 border-t-primary border-b-0" onClick={cardFlipHandler}>
      {!isBack ? (
        <>
          <small className="font-semibold">{level}</small>
          <h1 className="mt-3 mb-2">{front}</h1>
          <h4>{example}</h4>
        </>
      ) : (
        <>
          <small className="font-semibold">{level}</small>
          <h1 className="mt-3 mb-2">{back}</h1>
          <h4>{comment}</h4>
        </>
      )}
      <div className="FlexJustifyEnd mt-5">
        <Link to={`/cards/${cardId}/edit`}>
          <Button content="EDIT" />
        </Link>
        <Button content="DELETE" onClick={() => deleteHandler(cardId)} className="bg-accent bg-opacity-40 text-danger ml-2" />
      </div>
    </div>
  );
};

export default FlashCard;
