// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const UpcomingBookingsCard = ({ upcomingBookings }) => {
    return (
        <div className="card">
            <h2>Upcoming Bookings</h2>
            <div className="activities-grid">
                {upcomingBookings.length > 0 ? (
                    upcomingBookings.map(booking => (
                        <div className="booking-card" key={booking._id}>
                            <h4>User: {booking.user.name || 'Unnamed Client'}</h4> 
                            <p>Service: {booking.service ? booking.service.title : 'Service details not available'}</p>
                            <p>Date: {new Date(booking.date).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No upcoming bookings.</p>
                )}
            </div>
        </div>
    );
};

UpcomingBookingsCard.propTypes = {
    upcomingBookings: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            user: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
            service: PropTypes.shape({
                title: PropTypes.string.isRequired,
            }),
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default UpcomingBookingsCard;