import React from "react";
​
function Search() {
  function handleSubmit(e) {
    e.preventDefault();
  }
​
  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        placeholder="do the thing here"
        value={""}
        onChange={(e) => console.log(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}
​
export default Search;