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

    // Find the image for the current booking's service category
    const currentService = upcomingBookings[currentIndex].service;
    const categoryImage = services.find(service => service.category === currentService.category)?.image || ''; // Match by category

    return (
        <div className="card frosted-glass"> {/* Add relevant class here */}
            <h2>Upcoming Bookings</h2>
            {upcomingBookings.length > 0 ? (
                <div 
                    className="booking-card" 
                    style={{ 
                        backgroundImage: `url(${categoryImage})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                    }} // Set background image
                >
                    <h4>User: {upcomingBookings[currentIndex].user ? upcomingBookings[currentIndex].user.name : 'Unnamed Client'}</h4>
                    <p>Service: {currentService ? currentService.title : 'Service details not available'}</p>
                    <p>Category: {currentService ? currentService.category : 'No category available'}</p> {/* Added category */}
                    <p>Date: {new Date(upcomingBookings[currentIndex].date).toLocaleString()}</p>
                    <p>Time: {upcomingBookings[currentIndex].time}</p>
                    <p>Hours: {upcomingBookings[currentIndex].hours}</p>
                    <p>Status: {upcomingBookings[currentIndex].status}</p>
                    <div>
                        <button onClick={() => onUpdateStatus(upcomingBookings[currentIndex]._id, 'Confirmed')}>Confirm</button>
                        <button onClick={() => onUpdateStatus(upcomingBookings[currentIndex]._id, 'Cancelled')}>Cancel</button>
                    </div>
                </div>
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
                name: PropTypes.string,
            }),
            service: PropTypes.shape({
                title: PropTypes.string,
                category: PropTypes.string, // Ensure this is included
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