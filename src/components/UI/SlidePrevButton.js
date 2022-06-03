import React from "react";
import { useSwiper } from "swiper/react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const SlidePrevButton = () => {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slidePrev()} className="rounded-full p-2 m-2">
      <ArrowLeftIcon />
    </button>
  );
};

export default SlidePrevButton;
