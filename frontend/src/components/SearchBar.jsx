import React from "react";
export function SearchBar({
  searchInput,
  handleSearch
}) {
  return <><input className="input-field" type="text" id="fname" name="fname" style={{
      fontWeight: "bold",
      fontSize: "1.5vh"
    }} placeholder='Search...' value={searchInput} onChange={handleSearch} // {(e) => setSearchInput(e.target.value)}
    />
      <br></br>
      <br></br></>;
}
  