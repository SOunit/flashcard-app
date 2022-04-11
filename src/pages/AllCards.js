import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import CardList from "../components/Cards/CardList";
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

  useEffect(() => {
    if (authUser.uid) {
      const loginUserId = authUser.uid;
      console.log("loginUserId", loginUserId);
      console.log("Cards", loadedCards);
      dispatch({ type: "GET_USER_CARDS", payload: loginUserId });
    }
  }, [authUser]);

  let content;
  if (status === "pending") {
    content = (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    content = { error };
  }

  if (status === "completed" && (!loadedCards || loadedCards.length === 0)) {
    content = (
      <div>
        <h1>No cards found</h1>
      </div>
    );
  }

  content = <CardList cards={loadedCards} />;

  return (
    <>
      <CreateCardButton />
      {content}
      <Link to="/home">Go back</Link>
    </>
  );
};

export default AllCards;
