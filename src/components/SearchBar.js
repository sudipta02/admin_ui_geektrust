import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchUsers }) {
  return (
    <div className="search-bar">
      <div className="search-icon">
        <FontAwesomeIcon id="search-icon" icon={faMagnifyingGlass} />
      </div>
      <input
        placeholder="Search by name, email or role"
        onChange={searchUsers}
      />
    </div>
  );
}

export default SearchBar;
