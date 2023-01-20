import React, { useState } from "react";
import classes from "./ImageSlider.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

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

  // Hides dots if there are too many to fit on screen
  // Image count displayed in numbers instead
  const dotsContainerClasses =
    props.images.length > 20
      ? `${classes["dots-container"]} ${classes["no-show"]}`
      : classes["dots-container"];

  return (
    <div className={classes["slider-container"]}>
      <IoIosArrowBack
        className={classes["slider-button"]}
        onClick={prevHandler}
      />
      <div className={classes["slider-display"]}>
        <div className={classes.slider}>
          {props.images.map((slide, index) => {
            return (
              <div
                className={index === current ? "slide active" : "slide"}
                key={index}
              >
                {index === current && (
                  <img src={slide} className={classes.image} />
                )}
              </div>
            );
          })}
        </div>
        <div className={dotsContainerClasses}>
          {props.images.map((img, index) => {
            return (
              <div
                key={index}
                className={
                  index === current
                    ? `${classes["dot"]} ${classes["active"]}`
                    : classes["dot"]
                }
              ></div>
            );
          })}
        </div>
        {props.images.length > 20 && (
          <p>{`${current + 1} / ${props.images.length + 1}`}</p>
        )}
      </div>
      <IoIosArrowForward
        className={classes["slider-button"]}
        onClick={nextHandler}
      />
      <div className={classes["mobile-slider-controls-container"]}>
        <IoIosArrowBack
          className={classes["mobile-slider-button"]}
          onClick={prevHandler}
        />
        <IoIosArrowForward
          className={classes["mobile-slider-button"]}
          onClick={nextHandler}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
