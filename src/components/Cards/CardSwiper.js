import React from "react";

import FlashCard from "./FlashCard";
import SlideNextButton from "../UI/SlideNextButton";
import SlidePrevButton from "../UI/SlidePrevButton";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "./CardSwiper.css";

const CardSwiper = ({ cards }) => {
  return (
    <div className="mb-10 relative z-0">
      <Swiper
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <div className="flex justify-around absolute w-full z-10 -bottom-4">
          <SlidePrevButton />
          <SlideNextButton />
        </div>
        {cards &&
          cards.map(card => (
            <SwiperSlide key={card.id}>
              <FlashCard {...card} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CardSwiper;
