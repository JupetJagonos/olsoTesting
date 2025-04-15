// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import services from '../../api/ServiceData'; // Import services to get category images

const ProviderUpcomingBookingsCard = ({ upcomingBookings, onUpdateStatus }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // State to manage current booking index

    const nextBooking = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % upcomingBookings.length);
    };

    const previousBooking = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + upcomingBookings.length) % upcomingBookings.length);
    };

    return (
        <div className="card frosted-glass">
            <h2>Upcoming Bookings</h2>
            {upcomingBookings.length > 0 ? (
                (() => {
                    const currentBooking = upcomingBookings[currentIndex];
                    const currentService = currentBooking.service || {}; // Safeguard for service
                    const categoryImage = services.find(service => service.category === currentService.category)?.image || ''; // Match by category

                    return (
                        <div 
                            className="booking-card" 
                            style={{
                                backgroundImage: `url(${categoryImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }} // Set background image
                        >
                            <h4>User: {currentBooking.user ? currentBooking.user.name : 'Unnamed Client'}</h4>
                            <p>Service: {currentService.title || 'Service details not available'}</p>
                            <p>Category: {currentService.category || 'No category available'}</p>
                            <p>Date: {new Date(currentBooking.date).toLocaleString()}</p>
                            <p>Time: {currentBooking.time}</p>
                            <p>Hours: {currentBooking.hours}</p>
                            <p>Status: {currentBooking.status}</p>
                            <div>
                                <button onClick={() => onUpdateStatus(currentBooking._id, 'Confirmed')}>Confirm</button>
                                <button onClick={() => onUpdateStatus(currentBooking._id, 'Cancelled')}>Cancel</button>
                            </div>
                        </div>
                    );
                })()
            ) : (
                <p>No upcoming bookings.</p>
            )}
            <div className="carousel-controls">
                <button onClick={previousBooking} disabled={upcomingBookings.length <= 1}>Previous</button>
                <button onClick={nextBooking} disabled={upcomingBookings.length <= 1}>Next</button>
            </div>
        </div>
    );
};

ProviderUpcomingBookingsCard.propTypes = {
    upcomingBookings: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            user: PropTypes.shape({
                name: PropTypes.string.isRequired, // Assuming user has a name
            }),
            service: PropTypes.shape({
                title: PropTypes.string.isRequired,
                category: PropTypes.string.isRequired,
            }),
            date: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            hours: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
    onUpdateStatus: PropTypes.func.isRequired,
};

export default ProviderUpcomingBookingsCard;