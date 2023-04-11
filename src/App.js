import "./App.css";
import "./styles.css";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import Users from "./components/Users";
import { searchHelper } from "./helpers/searchHelper";
import { addFieldsOnUsersData } from "./helpers/addFieldsOnUsersData";
const config = require("./constants.json");
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [editUserId, setEditUserId] = useState(null);
  const [titleCheckbox, setTitleCheckBox] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUsers(addFieldsOnUsersData(res.data));
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const indexOfFirstUser = (currentPage - 1) * config.PAGE_SIZE;

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      setCurrentPage(1);
    } else if (pageNumber > Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(Math.ceil(users.length / usersPerPage));
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const saveUser = (id, nameRef, emailRef, roleRef) => {
    let newUsers = users;
    const index = newUsers.findIndex((user) => user.id === id);
    newUsers[index].name = nameRef.current.value;
    newUsers[index].email = emailRef.current.value;
    newUsers[index].role = roleRef.current.value;
    setUsers(newUsers);
    setEditUserId(null);
  };
  const handleDeleteClick = (userId) => {
    const newUsers = users.filter((user) => user.id !== userId);
    setUsers(newUsers);
  };
  const searchUsers = (e) => {
    let newUsers = searchHelper(e.target.value, users);
    setUsers(newUsers);
  };
  const selectRow = (id) => {
    let selectedUsers = users;
    const index = selectedUsers.findIndex((user) => user.id === id);
    selectedUsers[index].selected = !selectedUsers[index].selected;
    setUsers(selectedUsers);
  };
  const deleteSelectedUsers = () => {
    setUsers((prevState) => prevState.filter((user) => !user.selected));
    setTitleCheckBox(false);
  };
  const selectAllUsersShown = (e) => {
    setTitleCheckBox(e.target.checked);
    let selectedUserIds = users
      .filter((user) => user.show)
      .slice(indexOfFirstUser, indexOfFirstUser + config.PAGE_SIZE)
      .map((user) => user.id);
    let newUsers = users.map((user) => {
      if (selectedUserIds.includes(user.id)) {
        user.selected = e.target.checked ?? e.target.value;
        return user;
      }
      return user;
    });
    setUsers(newUsers);
  };
  return (
    <div className="main">
      <SearchBar searchUsers={searchUsers} />
      <Users
        users={users
          .filter((user) => user.show)
          .slice(indexOfFirstUser, indexOfFirstUser + config.PAGE_SIZE)}
        loading={loading}
        saveUser={saveUser}
        editUserId={editUserId}
        setEditUserId={setEditUserId}
        handleDeleteClick={handleDeleteClick}
        selectRow={selectRow}
        selectAllUsersShown={selectAllUsersShown}
        titleCheckbox={titleCheckbox}
      />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.filter((user) => user.show).length}
        paginate={paginate}
        currentPage={currentPage}
        deleteSelectedUsers={deleteSelectedUsers}
      />
    </div>
  );
}

export default App;
