import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PrimaryButton from "../UI/PrimaryButton";
import { CardContext } from "../../context";

const FlashCard = ({
  id: cardId,
  front,
  back,
  example,
  comment,
  level
}) => {
  const [isBack, setIsBack] = useState(false);
  const { dispatch} = useContext(CardContext);

  const cardFlipHandler = () => {
    setIsBack(!isBack);
  };

  const deleteHandler = cardId => {
    dispatch({ type: "DELETE_CARD", payload: cardId })
  };

  return (
    <Card sx={{ minWidth: 275, margin: "15px" }}>
      {!isBack ? (
        <CardContent onClick={cardFlipHandler}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {level}
          </Typography>
          <Typography sx={{ fontSize: 28, mb: 1.5 }}>{front}</Typography>
          <Typography variant="body2">{example}</Typography>
        </CardContent>
      ) : (
        <CardContent onClick={cardFlipHandler}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {level}
          </Typography>
          <Typography sx={{ fontSize: 28, mb: 1.5 }}>{back}</Typography>
          <Typography variant="body2">{comment}</Typography>
        </CardContent>
      )}

      <Link to={`/cards/${cardId}/edit`}>
        <PrimaryButton>EDIT</PrimaryButton>
      </Link>

      <PrimaryButton onClick={() => deleteHandler(cardId)}>
        DELETE
      </PrimaryButton>
    </Card>
  );
};

export default FlashCard;
