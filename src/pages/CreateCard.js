import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CardContext } from "../context/card-context";
import { AuthContext } from "../context/auth-context";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "../components/UI/Button";
import { getUserCards } from "../api/card-api";

const CreateCard = () => {
  const navigate = useNavigate();
  const { status, dispatch } = useContext(CardContext);
  const { authUser } = useContext(AuthContext);
  const [tryCreate, setTryCreate] = useState(false);

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

  console.log("status", status);

  const createNewCardHandler = (e) => {
    e.preventDefault();

    setTryCreate(true);

    dispatch({
      type: "ADD_CARD",
      payload: { cardData: cardData, uid: authUser.uid },
    });

    setFront("");
    setBack("");
    setExample("");
    setComment("");
    setLevel("");

    // fixme
    // navigate("/my-cards");
  };

  useEffect(() => {
    if (tryCreate && status === "completed") {
      console.log("DON!!!");

      navigate("/my-cards");
    }
  }, [tryCreate, status, navigate]);

  return (
    <div className="WhiteContainer my-8 sm:my-10">
      <div className="FlexColumn mb-5 w-full">
        <h1 className="mb-8">Create</h1>
        <div className="FlexColumn sm:flex-row">
          <TextField
            id="outlined-basic"
            label="front"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            sx={{ margin: "15px" }}
            onChange={(e) => setFront(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="back"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            sx={{ margin: "15px" }}
            onChange={(e) => setBack(e.target.value)}
          />
        </div>
        <div className="FlexColumn sm:flex-row">
          <TextField
            id="outlined-basic"
            label="example sentence"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            sx={{ margin: "15px" }}
            onChange={(e) => setExample(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="comment"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            sx={{ margin: "15px" }}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <FormControl sx={{ width: 225, margin: "15px" }}>
          <InputLabel id="demo-simple-select-autowidth-label">Level</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
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

      <div className="FlexCenter">
        <Button onClick={createNewCardHandler} content="CREATE" />
        <Link to="/my-cards">
          <Button
            content="CANCEL"
            className="bg-accent bg-opacity-40 text-danger ml-2"
          />
        </Link>
      </div>
    </div>
  );
};

export default CreateCard;
