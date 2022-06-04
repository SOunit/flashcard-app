import React from "react";
import { useSwiper } from "swiper/react";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const SlideNextButton = () => {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slideNext()} className="rounded-md px-4 py-0">
      <ArrowRightIcon />
    </button>
  );
};

export default SlideNextButton;
