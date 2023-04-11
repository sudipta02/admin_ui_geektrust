import { React, useState } from "react";
import ReadOnlyUserRow from "./UserComponents/ReadOnlyUserRow";
import EditableUserRow from "./UserComponents/EditableUserRow";

const Users = ({
  users,
  loading,
  saveUser,
  editUserId,
  setEditUserId,
  handleDeleteClick,
  selectRow,
  selectAllUsersShown,
  titleCheckbox,
}) => {
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);

    const formValues = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    setEditFormData(formValues);
  };
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };
  const handleCancelClick = () => {
    setEditUserId(null);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th id="checkbox-header">
            <input
              id="title-checkbox"
              type="checkbox"
              checked={titleCheckbox}
              onChange={(e) => selectAllUsersShown(e)}
            />
          </th>
          <th id="name-header">NAME</th>
          <th id="email-header">EMAIL</th>
          <th id="role-header">ROLE</th>
          <th id="actions-header">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return user.show ? (
            editUserId === user.id ? (
              <EditableUserRow
                user={user}
                saveUser={saveUser}
                editFormData={editFormData}
                handleEditFormChange={handleEditFormChange}
                handleCancelClick={handleCancelClick}
              />
            ) : (
              <ReadOnlyUserRow
                user={user}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                selectRow={selectRow}
              />
            )
          ) : null;
        })}
      </tbody>
    </table>
  );
};

export default Users;
