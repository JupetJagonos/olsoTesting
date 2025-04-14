// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const RecentBookingsCard = ({ recentBookings }) => {
    const currentDate = new Date();

    // Filter for completed bookings that are in the past
    const completedRecentBookings = recentBookings.filter(booking => 
        new Date(booking.date) < currentDate && booking.status === 'Completed'
    );

    return (
        <div className="card">
            <h2>Recent Bookings</h2>
            <div className="activities-grid">
                {completedRecentBookings.length > 0 ? (
                    completedRecentBookings.map(booking => (
                        <div className="booking-card" key={booking._id}>
                            <h4>Service: {booking.service ? booking.service.title : 'Service details not available'}</h4>
                            <p>Date: {new Date(booking.date).toLocaleString()}</p>
                            <p>Status: {booking.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No recent bookings.</p>
                )}
            </div>
        </div>
    );
};

// Prop types definition remains the same
RecentBookingsCard.propTypes = {
    recentBookings: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            service: PropTypes.shape({
                title: PropTypes.string,
            }),
            date: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default RecentBookingsCard;