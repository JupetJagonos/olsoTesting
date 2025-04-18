// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const ProviderRecentBookingsCard = ({ recentBookings }) => {
    const currentDate = new Date();

    const completedRecentBookings = recentBookings.filter(booking =>
        new Date(booking.date) < currentDate && booking.status === 'Completed'
    );

    return (
        <div className="card frosted-glass">
            <h2>Recent Bookings</h2>
            <div className="activity-grid"> {/* Changed to activity-grid */}
                {completedRecentBookings.length > 0 ? (
                    completedRecentBookings.map(booking => (
                        <div className="booking-card" key={booking._id}>
                            <h4>User: {booking.user ? booking.user.name : 'Unnamed Client'}</h4>
                            <p>Service: {booking.service ? booking.service.title : 'Service details not available'}</p>
                            <p>Date: {new Date(booking.date).toLocaleString()}</p>
                            <p>Status: {booking.status}</p>
                        </div>
                    ))
                ) : (
                    <div className="booking-card"> {/* Keep same structure */}
                        <p>No recent bookings.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

ProviderRecentBookingsCard.propTypes = {
    recentBookings: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            user: PropTypes.shape({
                name: PropTypes.string,
            }),
            service: PropTypes.shape({
                title: PropTypes.string,
            }),
            date: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ProviderRecentBookingsCard;