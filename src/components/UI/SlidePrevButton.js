import React from "react";
import { useSwiper } from "swiper/react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const SlidePrevButton = () => {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slidePrev()} className="rounded-md px-4 py-0">
      <ArrowLeftIcon />
    </button>
  );
};

export default SlidePrevButton;
