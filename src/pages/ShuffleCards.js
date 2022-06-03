import React, { useState, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { CardContext } from "../context/card-context";
import { AuthContext } from "../context/auth-context";

import FlashCard from "../components/Cards/FlashCard";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ShuffleCards = () => {
  const {
    data: loadedCards,
    error,
    status,
    dispatch,
  } = useContext(CardContext);
  const { authUser } = useContext(AuthContext);
  const [cards, setCards] = useState();

  const shuffle = arr => {
    let shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr;
  };

  useEffect(() => {
    if (authUser.uid) {
      const loginUserId = authUser.uid;
      dispatch({ type: "GET_USER_CARDS", payload: loginUserId });
    }
  }, [authUser]);

  const shuffleCardsHandler = () => {
    const shuffledCards = shuffle(cards);
    setCards(shuffledCards);
  };

  useEffect(() => {
    setCards(loadedCards);
  }, [loadedCards]);

  return (
    <>
      <button onClick={shuffleCardsHandler}>Shuffle</button>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {status === "pending" ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          cards &&
          cards.map(card => (
            <SwiperSlide key={card.id}>
              <FlashCard {...card} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <Link to="/cards">Cards List</Link>
    </>
  );
};

export default ShuffleCards;
