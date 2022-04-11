import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CardContext } from "../context/card-context";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PrimaryButton from "../components/UI/PrimaryButton";

const EditCard = () => {
  const cardId = useParams().cid;
  const navigate = useNavigate();
  const { dispatch, singleData, status } = useContext(CardContext);

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [example, setExample] = useState("");
  const [comment, setComment] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    dispatch({ type: "GET_SINGLE_CARD", payload: cardId });
  }, []);

  useEffect(() => {
    setFront(singleData?.front);
    setBack(singleData?.back);
    setExample(singleData?.example);
    setComment(singleData?.comment);
    setLevel(singleData?.level);
  }, [singleData]);

  const updatedCard = {
    id: cardId,
    front,
    back,
    example,
    comment,
    level,
  };

  const updateHandler = () => {
    dispatch({
      type: "UPDATE_CARD",
      payload: { id: cardId, data: updatedCard },
    });
    if (status === "completed") {
      navigate("/cards");
    }
  };

  return (
    <div className="section-container-wide center-col">
      <div>
        <TextField
          id="outlined-basic"
          label="front"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: 300, margin: "15px" }}
          value={front}
          onChange={e => setFront(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="back"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: 300, margin: "15px" }}
          value={back}
          onChange={e => setBack(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="example sentence"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: 300, margin: "15px" }}
          value={example}
          onChange={e => setExample(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="comment"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: 300, margin: "15px" }}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <FormControl sx={{ width: 200, margin: "15px" }}>
          <InputLabel id="demo-simple-select-autowidth-label">Level</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={level || "Normal"}
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
        <PrimaryButton onClick={updateHandler}>Save</PrimaryButton>
        <Link to="/home">Go back</Link>
      </div>
    </div>
  );
};

export default EditCard;
