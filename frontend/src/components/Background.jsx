// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import '../styles/Background.css'; // Import the CSS for background styles

const Background = ({ children }) => {
  return (
    <div className="background-container">
      {children} {/* This will render the rest of your application inside this div */}
    </div>
  );
};

// Define prop types
Background.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children prop is required and is a node (React element)
};

export default Background;