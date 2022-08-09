import React from "react";
import classes from "./Button.module.css";
export default function Button(props) {
  const { imgSrc, handleDelete, identifier, id, handleEdit } = props;

  const handleClick = () => {
    if (identifier === "deleteBtn") {
      handleDelete(id);
    }
    if (identifier === "editBtn") {
      handleEdit(id);
    }
  };
  return (
    <button onClick={handleClick} className={classes.btn}>
      <img alt={identifier} className={classes.icon} src={imgSrc} />
    </button>
  );
}
