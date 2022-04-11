import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CardContext } from "../context/card-context";
import { AuthContext } from "../context/auth-context";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PrimaryButton from "../components/UI/PrimaryButton";

const CreateCard = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(CardContext);
  const { authUser } = useContext(AuthContext);

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [example, setExample] = useState("");
  const [comment, setComment] = useState("");
  const [level, setLevel] = useState("");

  const loginUserId = authUser.uid;

  const cardData = {
    front: front,
    back: back,
    example: example,
    comment: comment,
    level: level,
    userId: loginUserId,
  };

  const createNewCardHandler = e => {
    e.preventDefault();

    dispatch({ type: "ADD_CARD", payload: cardData });

    setFront("");
    setBack("");
    setExample("");
    setComment("");
    setLevel("");

    navigate("/cards");
  };

  return (
    <div className="section-container-wide center-col">
      <h1>Create a new card!</h1>
      <div>
        <TextField
          id="outlined-basic"
          label="front"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: 300, margin: "15px" }}
          onChange={e => setFront(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="back"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: 300, margin: "15px" }}
          onChange={e => setBack(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="example sentence"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: 300, margin: "15px" }}
          onChange={e => setExample(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="comment"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: 300, margin: "15px" }}
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
      </div>
      <div className="center-row">
        <PrimaryButton onClick={createNewCardHandler}>Create</PrimaryButton>
        <Link to="/home">Go back</Link>
      </div>
    </div>
  );
};

export default CreateCard;
