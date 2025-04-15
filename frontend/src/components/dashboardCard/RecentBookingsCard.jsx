// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import services from '../../api/ServiceData'; // Import services to get category images

const RecentBookingsCard = ({ recentBookings }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // State to manage current booking index

    const nextBooking = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % recentBookings.length);
    };

    const previousBooking = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + recentBookings.length) % recentBookings.length);
    };

    // Find the image for the current booking's service category
    const currentService = recentBookings[currentIndex]?.service;
    const categoryImage = currentService ? 
        services.find(service => service.category === currentService.category)?.image || '' : '';

    return (
        <div className="card frosted-glass"> {/* Add relevant class here */}
            <h2>Recent Bookings</h2>
            {recentBookings.length > 0 ? (
                <div 
                    className="booking-card" 
                    style={{ 
                        backgroundImage: `url(${categoryImage})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                    }} // Set background image
                >
                    <h4>User: {recentBookings[currentIndex]?.user ? recentBookings[currentIndex].user.name : 'Unnamed Client'}</h4>
                    <p>Service: {currentService ? currentService.title : 'Service details not available'}</p>
                    <p>Category: {currentService ? currentService.category : 'No category available'}</p>
                    <p>Date: {new Date(recentBookings[currentIndex].date).toLocaleString()}</p>
                    <p>Time: {recentBookings[currentIndex].time}</p>
                    <p>Hours: {recentBookings[currentIndex].hours}</p>
                    <p>Status: {recentBookings[currentIndex].status}</p>
                </div>
            ) : (
                <p>No recent bookings available.</p>
            )}
            <div className="carousel-controls">
                <button onClick={previousBooking} disabled={recentBookings.length <= 1}>Previous</button>
                <button onClick={nextBooking} disabled={recentBookings.length <= 1}>Next</button>
            </div>
        </div>
    );
};

RecentBookingsCard.propTypes = {
    recentBookings: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            user: PropTypes.shape({
                name: PropTypes.string.isRequired, // Assuming user has a name
            }),
            service: PropTypes.shape({
                title: PropTypes.string.isRequired,
                category: PropTypes.string.isRequired, // Ensure this is included
            }),
            date: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            hours: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default RecentBookingsCard;