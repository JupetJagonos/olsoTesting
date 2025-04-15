// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import '../styles/SearchBar.css'; // Adjust to your CSS file path

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value); // Call parent's search function after querying
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="input"
                placeholder="Search for services..."
                value={query}
                onChange={handleChange}
            />
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired, // Ensure onSearch is a required function
};

export default SearchBar;