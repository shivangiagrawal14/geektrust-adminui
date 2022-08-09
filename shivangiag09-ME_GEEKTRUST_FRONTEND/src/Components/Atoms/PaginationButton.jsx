import React from "react";
import classes from "./PaginationButton.module.css";
export default function PaginationButton(props) {
  const { text, handlePageSelected, pageSelected } = props;
  const handleClick = () => {
    handlePageSelected(text);
  };
  return (
    <>
      <button
        onClick={handleClick}
        className={
          pageSelected === text ? classes.btnDivSelected : classes.btnDiv
        }
      >
        {text}
      </button>
    </>
  );
}
