import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const FlashCard = ({ front, back, example, comment, level }) => {
  const [isBack, setIsBack] = useState(false);

  const cardFlipHandler = () => {
    setIsBack(!isBack);
  };

  return (
    <Card sx={{ minWidth: 275, margin: "15px" }} onClick={cardFlipHandler}>
      {!isBack ? (
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {level}
          </Typography>
          <Typography sx={{ fontSize: 28, mb: 1.5 }}>{front}</Typography>
          <Typography variant="body2">{example}</Typography>
        </CardContent>
      ) : (
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {level}
          </Typography>
          <Typography sx={{ fontSize: 28, mb: 1.5 }}>{back}</Typography>
          <Typography variant="body2">{comment}</Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default FlashCard;
