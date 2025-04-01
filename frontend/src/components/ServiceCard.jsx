// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookService from './BookService'; 
import '../styles/ServiceCard.css';

const ServiceCard = ({ service }) => {
    const [isBooking, setIsBooking] = useState(false);
    const [hours, setHours] = useState(1); // Default number of hours for booking

    const handleBookClick = () => {
        setIsBooking((prev) => !prev); // Toggle the overlay visibility for booking
    };

    const handleCloseOverlay = () => {
        setIsBooking(false); // Close overlay
    };

    return (
        <div className="service-card">
            <div className="card-content">
                <h2 className="card-title">{service.title}</h2>
                <p className="card-description">{service.description}</p>
                <p className="card-category">Category: {service.category}</p>
                <p className="card-provider">Provider: {service.providerName || 'N/A'}</p>
                <p className="card-price">Price: ${service.price} / hour</p>
                <button className="button" onClick={handleBookClick}>
                    {isBooking ? 'Cancel Booking' : 'Book Service'}
                </button>
            </div>

            {isBooking && (
                <div className="overlay">
                    <button className="close-button" onClick={handleCloseOverlay}>X</button>
                    <BookService service={service} hours={hours} setHours={setHours} /> {/* Render the BookService component */}
                </div>
            )}
        </div>
    );
};

ServiceCard.propTypes = {
    service: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        providerName: PropTypes.string, // Optional for service; handle gracefully
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default ServiceCard;