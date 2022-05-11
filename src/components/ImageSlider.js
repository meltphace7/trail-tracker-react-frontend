import React, { useState } from "react";
import classes from "./ImageSlider.module.css";

const ImageSlider = (props) => {
  const [current, setCurrent] = useState(1);
  const length = props.images.length;

  if (!Array.isArray(props.images) || props.images.length <= 0) {
    return null;
  }

  const prevHandler = function () {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextHandler = function () {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  return (
    <div className={classes["slider-container"]}>
      <button className={classes["slider-button"]} onClick={prevHandler}>
        PREV
      </button>
      <div className={classes.slider}>
        {props.images.map((slide, index) => {
          return (
            <div
              className={
                index === current ? "slide active" : "slide"
              }
              key={index}
            >
              {index === current && (
                <img src={slide} className={classes.image} />
              )}
            </div>
          );
        })}
      </div>
      <button className={classes["slider-button"]} onClick={nextHandler}>
        NEXT
      </button>
    </div>
  );
};

export default ImageSlider;
