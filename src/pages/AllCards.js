import React, { useEffect, useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import CardList from "../components/Cards/CardList";
import CardFilter from "../components/Cards/CardFilter";
import CreateCardButton from "../components/UI/CreateCardButton";
import { CardContext } from "../context/card-context";
import { AuthContext } from "../context/auth-context";

const AllCards = () => {
  const {
    data: loadedCards,
    error,
    status,
    dispatch,
  } = useContext(CardContext);
  const { authUser } = useContext(AuthContext);
  const [levels, setLevels] = useState([]);
  const [content, setContent] = useState();

  const filterValueChangeHandler = useCallback(event => {
    const {
      target: { value },
    } = event;
    setLevels(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  }, []);

  useEffect(() => {
    if (authUser.uid) {
      const loginUserId = authUser.uid;
      dispatch({ type: "GET_USER_CARDS", payload: loginUserId });
    }
  }, [authUser]);

  if (error) {
    setContent({ error });
  }

  if (status === "completed" && (!loadedCards || loadedCards.length === 0)) {
    setContent(
      <div>
        <h1>No cards found</h1>
      </div>
    );
  }

  useEffect(() => {
    setContent(<CardList cards={loadedCards} />);
    if (levels && levels.length > 0) {
      const filteredLoadedCards = loadedCards?.filter(card =>
        levels.includes(card.level)
      );
      setContent(<CardList cards={filteredLoadedCards} />);
    }
  }, [levels, loadedCards]);

  return (
    <div className="section-container-wide center-col">
      <CreateCardButton />
      <div className="spacer-sm" />
      <CardFilter onChange={filterValueChangeHandler} value={levels} />
      <div className="spacer-sm" />
      {status === "pending" ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        content
      )}
      <div className="spacer-sm" />
      <Link to="/home">Go back</Link>
    </div>
  );
};

export default AllCards;
