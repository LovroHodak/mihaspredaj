import React, { useContext } from "react";
import { MyContext } from "../MyContext";

import { Carousel } from "react-bootstrap";

export default function Slider() {
  const [sliderInfo, setSliderInfo] = useContext(MyContext);

  return (
    <Carousel className="d-none d-md-block">
      {sliderInfo.map((item, i) => {
        return (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={item.categoryImg}
              alt={item.categoryName}
            />
            <Carousel.Caption>
              <h3>{item.categoryName}</h3>
              <p>{item.categoryDesc}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
