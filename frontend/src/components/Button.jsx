// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const Button = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="btn">
      {label}
    </button>
  );
};

// Define prop types for validation
Button.propTypes = {
  onClick: PropTypes.func.isRequired, // Validate that onClick is a required function
  label: PropTypes.string.isRequired,   // Validate that label is a required string
};

export default Button;