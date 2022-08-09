import React from "react";
import classes from "./ArrowButton.module.css";
export default function ArrowButton(props) {
  const {
    imgSrc,
    handlePageSelected,
    pageSelected,
    identifier,
    lastPage,
    userData,
  } = props;

  const handleArrowClick = () => {
    if (identifier === "left") {
      if (pageSelected !== 1) {
        handlePageSelected(+pageSelected - 1);
      }
    } else if (identifier === "right") {
      console.log(lastPage);
      if (pageSelected !== +lastPage) {
        handlePageSelected(+pageSelected + 1);
      }
    } else if (identifier === "startingPage") {
      handlePageSelected(1);
    } else if (identifier === "endingPage") {
      console.log(lastPage);
      handlePageSelected(+lastPage);
    }
  };

  if (userData.length === 0) {
    return (
      <button
        onClick={handleArrowClick}
        className={classes.btnDivArrowDisabled}
      >
        <img alt={identifier} className={classes.iconImg} src={imgSrc} />
      </button>
    );
  } else if (
    pageSelected === 1 &&
    (identifier === "startingPage" || identifier === "left")
  ) {
    return (
      <button
        onClick={handleArrowClick}
        className={classes.btnDivArrowDisabled}
      >
        <img alt={identifier} className={classes.iconImg} src={imgSrc} />
      </button>
    );
  } else if (
    pageSelected === +lastPage &&
    (identifier === "endingPage" || identifier === "right")
  ) {
    return (
      <button
        onClick={handleArrowClick}
        className={classes.btnDivArrowDisabled}
      >
        <img alt={identifier} className={classes.iconImg} src={imgSrc} />
      </button>
    );
  } else {
    return (
      <button onClick={handleArrowClick} className={classes.btnDivArrow}>
        <img alt={identifier} className={classes.iconImg} src={imgSrc} />
      </button>
    );
  }
}
