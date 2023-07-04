import React from "react";

const Search = ({ search, handleSearch }) => {
  return (
    <div className="search-container">
      <div className="input-field">
        Search:
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="search-field"
        />
      </div>
    </div>
  );
};

export default Search;
