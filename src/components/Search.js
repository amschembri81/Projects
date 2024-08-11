import React, { useState } from 'react';
import '../styling/Search.css';

function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch search results from Wikipedia API
  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${query}`
      );
      const data = await response.json();
      return data.query.search;
    } catch (error) {
      handleAPIError(error.message);
      return [];
    }
  };

  // Parse the API response to extract relevant details
  const parseSearchResults = (apiResponse) => {
    return apiResponse.map((item) => ({
      title: item.title,
      snippet: item.snippet,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
    }));
  };

  // Display the search results in the UI
  const displaySearchResults = (results) => {
    setSearchResults(results);
  };

  // Handle the search input field and trigger the search process
  const handleSearchInput = (event) => {
    setQuery(event.target.value);
    if (event.target.value) {
      updateSearchUI(event.target.value);
    } else {
      clearSearchResults();
    }
  };

  // Update the UI with search results
  const updateSearchUI = async (query) => {
    setLoading(true);
    const apiResponse = await fetchSearchResults(query);
    const parsedResults = parseSearchResults(apiResponse);
    displaySearchResults(parsedResults);
    setLoading(false);
  };

  // Clear the search results from the UI
  const clearSearchResults = () => {
    setSearchResults([]);
  };

  // Show a loading indicator while fetching search results
  const showLoadingIndicator = () => {
    return <div className="loading">Loading...</div>;
  };

  // Hide the loading indicator
  const hideLoadingIndicator = () => {
    setLoading(false);
  };

  // Handle API errors
  const handleAPIError = (error) => {
    setError(`Error: ${error}`);
    setLoading(false);
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          value={query}
          placeholder="Search Wikipedia..."
          onChange={handleSearchInput}
        />
        {loading && showLoadingIndicator()}
        {error && <div className="error">{error}</div>}
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index} className="search-result-item">
              <h3>
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
              </h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;