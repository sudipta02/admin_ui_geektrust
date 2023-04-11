import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ReadOnlyUserRow = ({
  user,
  handleEditClick,
  handleDeleteClick,
  selectRow,
}) => {
  const [useBackground, setBackground] = useState(null);
  const selectUser = (userId) => {
    if (useBackground !== userId) {
      setBackground(userId);
    } else {
      setBackground(null);
    }
  };
  return (
    <tr
      key={user.id}
      onChange={() => selectUser(user.id)}
      className={
        useBackground === user.id || user.selected ? "selected-row" : ""
      }
    >
      <td>
        <input
          type="checkbox"
          onChange={() => selectRow(user.id)}
          checked={user.selected}
        />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button onClick={(event) => handleEditClick(event, user)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button id="trash-icon" onClick={() => handleDeleteClick(user.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyUserRow;
