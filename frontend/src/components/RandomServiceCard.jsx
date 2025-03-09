// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/randomService.css'; // Ensure the path is correct

const RandomServiceCard = ({ title,image, link }) => {
    return (
        <a href={link} className="service-card"> {/* Link to the service page */}
            <img src={image} alt={title} className="service-card-image" /> {/* Image of the service */}
        </a>
    );
};

// Define prop types for validation
RandomServiceCard.propTypes = {
    title: PropTypes.string.isRequired, // Title is required and should be a string
    description: PropTypes.string.isRequired, // Description is required and should be a string
    image: PropTypes.string.isRequired, // Image is required and should be a string
    link: PropTypes.string.isRequired, // Link is required to navigate
};

export default RandomServiceCard;