import React, { useState } from 'react';

function SearchScreen() {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here, for example, fetching data from an API
    console.log('Searching for:', query);
    // You can perform your search operation here, such as fetching data from an API
    // For simplicity, I'm just logging the query to the console
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <input
        type="text"
        placeholder="search here..."
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchScreen;
