import React, { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PrimaryButton from "../components/UI/PrimaryButton";
import CardContext from "../store/CardContext";

const CreateCard = () => {
  const { dispatch } = useContext(CardContext);
  const navigate = useNavigate();

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [example, setExample] = useState("");
  const [comment, setComment] = useState("");
  const [level, setLevel] = useState("");

  const id = Math.random().toString(32).substring(2);
  const card = {
    id: id,
    front: front,
    back: back,
    example: example,
    comment: comment,
    level: level,
  };

  const createNewCardHandler = useCallback(
    e => {
      e.preventDefault();

      dispatch({ type: "ADD_CARD", payload: { card: card } });

      setFront("");
      setBack("");
      setExample("");
      setComment("");
      setLevel("");
      navigate("/");
    },
    [card]
  );

  return (
    <>
      <h1>Create a new card</h1>
      <TextField
        id="outlined-basic"
        label="front"
        multiline
        rows={4}
        variant="outlined"
        sx={{ width: 200, margin: "15px" }}
        onChange={e => setFront(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="back"
        multiline
        rows={4}
        variant="outlined"
        sx={{ width: 200, margin: "15px 10px" }}
        onChange={e => setBack(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="example sentence"
        multiline
        rows={4}
        variant="outlined"
        sx={{ width: 200, margin: "15px" }}
        onChange={e => setExample(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="comment"
        multiline
        rows={4}
        variant="outlined"
        sx={{ width: 200, margin: "15px" }}
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
          <MenuItem value={4}>Critical</MenuItem>
          <MenuItem value={3}>High</MenuItem>
          <MenuItem value={2}>Normal</MenuItem>
          <MenuItem value={1}>Low</MenuItem>
        </Select>
      </FormControl>
      <PrimaryButton onClick={createNewCardHandler}>Create</PrimaryButton>
    </>
  );
};

export default CreateCard;
