import React, { useEffect, useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import CardList from "../components/Cards/CardList";
import CardFilter from "../components/Cards/CardFilter";
import CardSearch from "../components/Cards/CardSearch";
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
  const [listContent, setListContent] = useState();
  const [searchInput, setSearchInput] = useState();

  const searchInputChangeHandler = useCallback(event => {
    const {
      target: { value },
    } = event;
    setSearchInput(value);
  }, []);

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
    setListContent({ error });
  }

  if (status === "completed" && (!loadedCards || loadedCards.length === 0)) {
    setListContent(
      <div>
        <h1>No cards found</h1>
      </div>
    );
  }

  useEffect(() => {
    setListContent(<CardList cards={loadedCards} />);
    if (levels && levels.length > 0) {
      const filteredCards = loadedCards?.filter(card =>
        levels.includes(card.level)
      );
      setListContent(<CardList cards={filteredCards} />);
    }
  }, [levels, loadedCards]);

  useEffect(() => {
    const searchResult = loadedCards?.filter(
      card =>
        card.front.includes(searchInput) ||
        card.back.includes(searchInput) ||
        card.comment.includes(searchInput)
    );
    setListContent(<CardList cards={searchResult} />);
  }, [searchInput]);

  return (
    <div className="section-container-wide center-col">
      <CreateCardButton />
      <div className="spacer-sm" />
      <CardSearch onChange={searchInputChangeHandler} />
      <CardFilter onChange={filterValueChangeHandler} value={levels} />
      <div className="spacer-sm" />
      {status === "pending" ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        listContent
      )}
      <div className="spacer-sm" />
      <Link to="/home">Go back</Link>
    </div>
  );
};

export default AllCards;
