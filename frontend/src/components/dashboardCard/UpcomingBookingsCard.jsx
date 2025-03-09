// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const UpcomingBookingsCard = ({ upcomingBookings }) => {
    return (
        <div className="upcoming-bookings">
            <h2>Upcoming Bookings</h2>
            {upcomingBookings.length > 0 ? (
                <ul>
                    {upcomingBookings.map(booking => (
                        <li key={booking._id}>
                            <p>User: {booking.user.name || 'Unnamed Client'}</p> {/* Access the populated user name */}
                            <p>Service: {booking.service ? booking.service.title : 'Service details not available'}</p>
                            <p>Date: {new Date(booking.date).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No upcoming bookings.</p>
            )}
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