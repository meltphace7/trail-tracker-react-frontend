import React, { useState, useEffect } from "react";
import classes from "./ImageSlider.module.css";
import { IoIosArrowBack, IoMdFingerPrint } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import {useParams} from 'react-router-dom'

const ImageSlider = (props) => {
  const { trailId } = useParams();
  const [current, setCurrent] = useState(1);
  const length = props.images.length;

    useEffect(() => {
      setCurrent(0);
    }, [trailId]);
  
  useEffect(() => {
  if (length === 1) {
    setCurrent(0);
  }
  }, [length])


  if (!Array.isArray(props.images) || props.images.length <= 0) {
    return null;
  }

  const prevHandler = function () {
    setCurrent(current === 0 ? length - 1 : current - 1);
    console.log('prev');
  };

  const nextHandler = function () {
    setCurrent(current === length - 1 ? 0 : current + 1);
    console.log('next');
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
                  <img src={slide} className={classes.image} alt="trail pic" />
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
