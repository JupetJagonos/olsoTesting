// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for props validation 

const ServiceCategoryFilter = ({ categories, onCategorySelect }) => {
    return (
        <div>
            <label htmlFor="categoryFilter">Filter by Category:</label>
            <select id="categoryFilter" onChange={(e) => onCategorySelect(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

// Prop types validation
ServiceCategoryFilter.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure categories is an array of strings
    onCategorySelect: PropTypes.func.isRequired, // Ensure onCategorySelect is a required function
};

export default ServiceCategoryFilter;