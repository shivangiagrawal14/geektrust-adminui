import React from "react";
import classes from "./Search.module.css";
export default function Search(props) {
  const { handleSearch } = props;

  const handleUserInput = (e) => {
    handleSearch(e?.target?.value);
  };
  return (
    <input
      className={classes.search}
      placeholder="Search by name,email or role"
      onChange={handleUserInput}
      type="text"
    />
  );
}
