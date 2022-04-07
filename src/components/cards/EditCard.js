import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getSingleCard } from "../../api/api";
import { updateCard } from "../../api/api";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PrimaryButton from "../UI/PrimaryButton";

const EditCard = ({ cardId }) => {
  const navigate = useNavigate();
  const { sendRequest: setCard, data: loadedCard } = useHttp(
    getSingleCard,
    true
  );
  const { sendRequest: saveCard } = useHttp(updateCard, true);

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [example, setExample] = useState("");
  const [comment, setComment] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    setCard(cardId);
  }, [setCard]);

  useEffect(() => {
    setFront(loadedCard?.front);
    setBack(loadedCard?.back);
    setExample(loadedCard?.example);
    setComment(loadedCard?.comment);
    setLevel(loadedCard?.level);
  }, [loadedCard]);

  const updatedCard = {
    id: cardId,
    front,
    back,
    example,
    comment,
    level,
  };

  const updateHandler = (id, cardData) => {
    console.log("updatedHandler", id, cardData);
    saveCard(id, cardData);
    navigate("/cards");
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="front"
        multiline
        rows={4}
        variant="outlined"
        sx={{ width: 200, margin: "15px" }}
        value={front}
        onChange={e => setFront(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="back"
        multiline
        rows={4}
        variant="outlined"
        sx={{ width: 200, margin: "15px 10px" }}
        value={back}
        onChange={e => setBack(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="example sentence"
        multiline
        rows={4}
        variant="outlined"
        sx={{ width: 200, margin: "15px" }}
        value={example}
        onChange={e => setExample(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="comment"
        multiline
        rows={4}
        variant="outlined"
        sx={{ width: 200, margin: "15px" }}
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <FormControl sx={{ width: 200, margin: "15px" }}>
        <InputLabel id="demo-simple-select-autowidth-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={level}
          onChange={e => setLevel(e.target.value)}
          autoWidth
          label="Level"
        >
          <MenuItem value={"Critical"}>Critical</MenuItem>
          <MenuItem value={"High"}>High</MenuItem>
          <MenuItem value={"Normal"}>Normal</MenuItem>
          <MenuItem value={"Low"}>Low</MenuItem>
        </Select>
      </FormControl>
      <PrimaryButton
        onClick={() => {
          updateHandler(cardId, updatedCard);
        }}
      >
        Save
      </PrimaryButton>
    </>
  );
};

export default EditCard;
