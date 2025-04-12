// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const ProviderUpcomingBookingsCard = ({ upcomingBookings, onUpdateStatus }) => {
    return (
        <div className="card">
            <h2>Upcoming Bookings sng prov</h2>
            <div className="activities-grid">
                {upcomingBookings.length > 0 ? (
                    upcomingBookings.map(booking => (
                        <div className="booking-card" key={booking._id}>
                            <h4>User: {booking.user ? booking.user.name : 'Unnamed Client'}</h4>
                            <p>Service: {booking.service ? booking.service.title : 'Service details not available'}</p>
                            <p>Date: {new Date(booking.date).toLocaleString()}</p>
                            <p>Time: {booking.time}</p>
                            <p>Hours: {booking.hours}</p>
                            <p>Status: {booking.status}</p>
                            <div>
                                <button onClick={() => onUpdateStatus(booking._id, 'Confirmed')}>Confirm</button>
                                <button onClick={() => onUpdateStatus(booking._id, 'Cancelled')}>Cancel</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No upcoming bookings.</p>
                )}
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