// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import services from '../../api/ServiceData'; // Ensure the path is correct
import api from '../../api';

const UpcomingBookingsCard = ({ upcomingBookings, userType, onUpdateStatus }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // State to manage current booking index

    const nextBooking = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % upcomingBookings.length);
    };

    const previousBooking = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + upcomingBookings.length) % upcomingBookings.length);
    };

    const currentService = upcomingBookings[currentIndex]?.service; 
    const categoryImage = currentService ? 
        services.find(service => service.category === currentService.category)?.image || '' : '';

    // Function to handle booking cancellation for clients
    const handleCancelBooking = async () => {
        const token = localStorage.getItem('token');
        if (!token) return; // Ensure user is logged in

        try {
            await api.put(`/api/appointments/${upcomingBookings[currentIndex]._id}/status`, {
                status: 'Cancelled'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onUpdateStatus(upcomingBookings[currentIndex]._id, 'Cancelled'); // Call parent handler to update status
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    };

    return (
        <div className="card frosted-glass">
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
                    <h4>User: {upcomingBookings[currentIndex]?.user ? upcomingBookings[currentIndex].user.name : 'Unnamed Client'}</h4>
                    <p>Service: {currentService ? currentService.title : 'Service details not available'}</p>
                    <p>Category: {currentService ? currentService.category : 'No category available'}</p>
                    <p>Date: {new Date(upcomingBookings[currentIndex].date).toLocaleString()}</p>
                    <p>Time: {upcomingBookings[currentIndex].time}</p>
                    <p>Hours: {upcomingBookings[currentIndex].hours}</p>
                    <p>Status: {upcomingBookings[currentIndex].status}</p>
                    <p>Payment: {upcomingBookings[currentIndex].paymentStatus}</p>

                    {/* Show Cancel button only for clients */}
                    {userType === 'Client' && (
                        <button onClick={handleCancelBooking}>Cancel</button>
                    )}
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

UpcomingBookingsCard.propTypes = {
    upcomingBookings: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            user: PropTypes.shape({
                name: PropTypes.string,
            }),
            service: PropTypes.shape({
                title: PropTypes.string.isRequired,
                category: PropTypes.string.isRequired, // Ensure this is included
            }),
            date: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            hours: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
            paymentStatus: PropTypes.string.isRequired,
        })
    ).isRequired,
    userType: PropTypes.string.isRequired, // Ensures userType is provided
    onUpdateStatus: PropTypes.func.isRequired, // Function to call when updating booking status
};

export default UpcomingBookingsCard;