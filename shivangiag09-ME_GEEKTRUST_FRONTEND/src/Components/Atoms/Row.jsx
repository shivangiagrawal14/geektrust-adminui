import React from "react";
import classes from "./Row.module.css";
export default function Row(props) {
  const {
    id,
    name,
    email,
    role,
    editId,
    handleInputChange,
    handleCheckBox,
    isChecked,
  } = props;
  const handleChange = (e) => {
    handleInputChange(editId, e.target.name, e.target.value);
  };
  const handleSelectedCheckBox = (e) => {
    handleCheckBox(id);
  };

  if (id !== editId) {
    return (
      <>
        <td>
          <input
            type="checkbox"
            id="checkbox"
            name="isSelected"
            checked={isChecked}
            onChange={handleSelectedCheckBox}
          />
        </td>
        <td>{name}</td>
        <td>{email}</td>
        <td> {role}</td>
      </>
    );
  } else {
    return (
      <>
        <td className={classes.noPadding} onChange={handleSelectedCheckBox}>
          <input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            checked={isChecked}
            onChange={handleCheckBox}
          />
        </td>
        <td className={classes.noPadding}>
          <input
            className={classes.inputBox}
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </td>
        <td className={classes.noPadding}>
          <input
            className={classes.inputBox}
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </td>
        <td className={classes.noPadding}>
          <select
            className={classes.inputBox}
            name="role"
            id="role"
            value={role}
            onChange={handleChange}
          >
            <option value="admin">admin</option>
            <option value="member">member</option>
          </select>
        </td>
      </>
    );
  }
}
