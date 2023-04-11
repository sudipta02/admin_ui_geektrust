import { React, useRef } from "react";

const EditableUserRow = ({
  user,
  saveUser,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
          ref={nameRef}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
          ref={emailRef}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a role..."
          name="role"
          value={editFormData.role}
          onChange={handleEditFormChange}
          ref={roleRef}
        ></input>
      </td>

      <td>
        <button
          type="submit"
          onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
        >
          Save
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableUserRow;
