import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addCard } from "../api/api";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PrimaryButton from "../components/UI/PrimaryButton";

const CreateCard = () => {
  const navigate = useNavigate();
  const { sendRequest, status } = useHttp(addCard, true);

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [example, setExample] = useState("");
  const [comment, setComment] = useState("");
  const [level, setLevel] = useState("");

  const cardData = {
    front: front,
    back: back,
    example: example,
    comment: comment,
    level: level,
  };

  useEffect(() => {
    if (status === "completed") {
      navigate("/cards");
    }
  }, [status, navigate]);

  const createNewCardHandler = useCallback(
    e => {
      e.preventDefault();

      sendRequest(cardData);

      setFront("");
      setBack("");
      setExample("");
      setComment("");
      setLevel("");
    },
    [cardData]
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
          <MenuItem value={"Critical"}>Critical</MenuItem>
          <MenuItem value={"High"}>High</MenuItem>
          <MenuItem value={"Normal"}>Normal</MenuItem>
          <MenuItem value={"Low"}>Low</MenuItem>
        </Select>
      </FormControl>
      <PrimaryButton onClick={createNewCardHandler}>Create</PrimaryButton>
      <Link to="/">Go back</Link>
    </>
  );
};

export default CreateCard;
