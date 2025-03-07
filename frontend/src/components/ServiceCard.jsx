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
        <div className="card">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <p>Category: {service.category}</p>
            <button onClick={handleBookClick}>
                {isBooking ? 'Cancel Booking' : 'Book Service'}
            </button>

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
    }).isRequired,
};

export default ServiceCard;