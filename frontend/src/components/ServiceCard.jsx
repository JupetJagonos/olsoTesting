// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookService from './BookService'; // Import the BookService component

const ServiceCard = ({ service }) => {
    const [isBooking, setIsBooking] = useState(false); // Local state to manage booking visibility

    const handleBookClick = () => {
        setIsBooking(prev => !prev); // Toggle booking state
    };

    return (
        <div 
            className="service-card" 
            style={{ backgroundImage: `url(${service.image})` }} // Use service.image for background
        >
            <div className="overlay">
                <h2 className="card-title">{service.title}</h2>
                <p className="card-description">{service.description}</p>
                <p className="card-category">Category: {service.category}</p>
                <button className="button" onClick={handleBookClick}>
                    {isBooking ? 'Cancel Booking' : 'Book Service'}
                </button>
            </div>

            {/* Conditionally render the BookService form */}
            {isBooking && <BookService service={service} />}
        </div>
    );
};

ServiceCard.propTypes = {
    service: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired, // Required for the image URL
    }).isRequired,
};

export default ServiceCard;