import React from "react";
import "./DisplayPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Atoms/Search";
import Button from "./Atoms/Button";
import PaginationButton from "./Atoms/PaginationButton";
import ArrowButton from "./Atoms/ArrowButton";
import Row from "./Atoms/Row";

const myDebounce = function (callBackFn, delay) {
  let clearTime;
  return function () {
    let self = this;
    let args = arguments;
    clearTimeout(clearTime);
    clearTime = setTimeout(() => {
      callBackFn.apply(self, args);
    }, delay);
  };
};

const debounceMethod = myDebounce((handleNewDSearchData, searchText) => {
  handleNewDSearchData(searchText);
}, 300);

let allData = [];
export default function DisplayPage() {
  const [userData, setUserData] = useState({});
  const [pageSelected, setPageSelected] = useState(1);
  const [editId, setEditId] = useState("");
  const [mainCheckbox, setMainCheckbox] = useState(false);
  //fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const result = response.data;
      result.forEach((item) => {
        item.checked = false;
      });
      allData = result;
      setUserData(result);
    } catch (error) {
      console.log(error);
    }
  };

  //calculate number of pages
  const calculateLengthOfdata = (data) => {
    return Math.ceil(data.length / 10);
  };

  //calculate number of buttons
  const calculateArray = (userData) => {
    let length = userData.length;
    let numberOfButtons = Math.ceil(length / 10);
    let cnt = 1;
    let buttonsArray = new Array(numberOfButtons).fill(cnt++);
    return buttonsArray;
  };

  //set the current page
  const handlePageSelected = (value) => {
    setPageSelected(value);
  };

  //display the data for each page
  const displayData = (idx) => {
    let initialVal;
    let array = [];
    if (idx === 1) {
      initialVal = 0;
    } else {
      initialVal = (idx - 1) * 10;
    }
    array = userData.slice(initialVal, initialVal + 10);
    return array;
  };

  //callback for edit
  const handleEdit = (id) => {
    setEditId(id);
  };

  //edit buttonn functionality
  const handleInputChange = (id, key, value) => {
    let userDetails = [...userData];
    userDetails.forEach((item) => {
      if (item.id === id) {
        item[key] = value;
      }
    });
    setUserData(userDetails);
  };

  ///handle delete icon
  const handleDelete = (id) => {
    let array = [...userData];
    array.forEach((item, idx) => {
      if (item.id === id) {
        array.splice(idx, 1);
        allData.splice(allData.indexOf(item), 1);
      }
    });
    if (
      pageSelected === calculateLengthOfdata(userData) &&
      displayData(pageSelected).length - 1 === 0
    ) {
      setPageSelected(pageSelected - 1);
    }
    setUserData(array);
  };

  //select all elements from top left check box to delete current page data
  const handleAllSelected = (e) => {
    let arr = [...userData];
    if (mainCheckbox) {
    }
    arr.forEach((item, idx) => {
      if ((+pageSelected - 1) * 10 <= idx && idx + 1 <= +pageSelected * 10) {
        if (!mainCheckbox) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      }
    });
    setUserData(arr);
    setMainCheckbox(!mainCheckbox);
  };

  //set checked and unchecked in the state
  const handleCheckBox = (selectedId) => {
    let arr = [...userData];

    arr.forEach((item) => {
      if (item.id === selectedId) {
        let temp = item.checked;
        item.checked = !temp;
      }
    });

    setUserData(arr);
  };

  //delete the selected check boxes
  const handleDeleteSelected = () => {
    let array = [...userData];
    userData.forEach((item, idx) => {
      if (item.checked) {
        allData.splice(allData.indexOf(item), 1);
        array.splice(array.indexOf(item), 1);
      }
    });
    if (mainCheckbox) {
      setMainCheckbox(!mainCheckbox);
    }
    setUserData(array);
    if (pageSelected === calculateLengthOfdata(userData)) {
      if (array.length % 10 > 0) {
        setPageSelected(pageSelected);
      } else {
        setPageSelected(pageSelected - 1);
      }
    } else if (pageSelected === 1) {
      setPageSelected(1);
    } else {
      if (displayData(pageSelected).length - 1 === 0) {
        setPageSelected(pageSelected - 1);
      } else {
        setPageSelected(pageSelected);
      }
    }
  };

  //  page click event to change input to normal td
  const handleDisplayPageClick = (e) => {
    if (e.target.localName === "input" || e.target.localName === "select") {
      e.stopPropagation();
    } else {
      editId !== "" && setEditId("");
    }
  };

  //search function using debounce
  const handleSearch = (params) => {
    debounceMethod(() => {
      const filteredData = allData.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(params.toLowerCase())
      );
      setUserData(filteredData);
      setPageSelected(1);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="displayPage" onClick={handleDisplayPageClick}>
      <Search handleSearch={handleSearch} />
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                id="checkbox"
                name="isSelected"
                checked={mainCheckbox}
                onChange={handleAllSelected}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 &&
            displayData(pageSelected).map((item, idx) => {
              return (
                <tr
                  key={item.id}
                  className={item.checked ? "trHighlighted" : ""}
                >
                  <Row
                    handleInputChange={handleInputChange}
                    isChecked={item.checked}
                    editId={editId}
                    id={item.id}
                    name={item.name}
                    email={item.email}
                    role={item.role}
                    handleCheckBox={handleCheckBox}
                  />

                  <td>
                    <Button
                      identifier="editBtn"
                      id={item.id}
                      handleEdit={handleEdit}
                      imgSrc="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                    />
                    <Button
                      identifier="deleteBtn"
                      id={item.id}
                      handleDelete={handleDelete}
                      imgSrc="https://cdn-icons-png.flaticon.com/128/812/812853.png"
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {userData.length > 0 && (
        <div className="user-actions">
          <button className="delete-selected" onClick={handleDeleteSelected}>
            Delete Selected
          </button>
          <div className="pagination-btn">
            <ArrowButton
              userData={userData}
              pageSelected={pageSelected}
              identifier="startingPage"
              lastPage={calculateLengthOfdata(userData)}
              handlePageSelected={handlePageSelected}
              imgSrc="https://img.icons8.com/ios-glyphs/2x/double-left.png"
            />

            <ArrowButton
              userData={userData}
              pageSelected={pageSelected}
              identifier="left"
              lastPage={calculateLengthOfdata(userData)}
              handlePageSelected={handlePageSelected}
              imgSrc="https://img.icons8.com/external-becris-lineal-becris/2x/external-left-arrow-mintab-for-ios-becris-lineal-becris.png"
            />
            {userData.length > 0 &&
              calculateArray(userData).map((item, idx) => {
                return (
                  <PaginationButton
                    pageSelected={pageSelected}
                    handlePageSelected={handlePageSelected}
                    key={idx}
                    text={++idx}
                  />
                );
              })}
            <ArrowButton
              userData={userData}
              identifier="right"
              pageSelected={pageSelected}
              lastPage={calculateLengthOfdata(userData)}
              handlePageSelected={handlePageSelected}
              imgSrc="https://img.icons8.com/ios/2x/forward.png"
            />

            <ArrowButton
              userData={userData}
              pageSelected={pageSelected}
              identifier="endingPage"
              lastPage={calculateLengthOfdata(userData)}
              handlePageSelected={handlePageSelected}
              imgSrc="https://img.icons8.com/ios-glyphs/2x/double-right.png"
            />
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}
