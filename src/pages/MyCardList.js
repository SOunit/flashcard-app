import React, { useEffect, useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import Bug from "../assets/icons/bug.png";
import CardList from "../components/Cards/CardList";
import CardFilter from "../components/Cards/CardFilter";
import CardSearch from "../components/Cards/CardSearch";
import NoResultsFound from "../components/UI/NoResultsFound";
import { CardContext } from "../context/card-context";
import { AuthContext } from "../context/auth-context";

const MyCardList = () => {
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

    setListContent(
      searchResult && searchResult.length === 0 ? (
        <NoResultsFound />
      ) : (
        <CardList cards={searchResult} />
      )
    );
  }, [searchInput]);

  return (
    <>
      <div className="FlexColumn sm:flex-row my-10">
        <CardSearch onChange={searchInputChangeHandler} />
        <CardFilter onChange={filterValueChangeHandler} value={levels} />
      </div>
      <div className="overflow-y-scroll">
        {status === "pending" ? (
          <div className="FlexCenter my-10">
            <h2>Loading...</h2>
            <img src={Bug} className="h-12 w-auto ml-2" />
          </div>
        ) : (
          listContent
        )}
      </div>
      <div className="text-center mb-10">
        <Link to="/cards">
          <h5>back to menu</h5>
        </Link>
      </div>
    </>
  );
};

export default MyCardList;
