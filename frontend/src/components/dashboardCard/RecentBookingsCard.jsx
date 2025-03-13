// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const RecentBookingsCard = ({ userType }) => {
    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        const fetchRecentBookings = async () => {
            const token = localStorage.getItem('token'); 
            if (userType === 'Provider') {
                try {
                    const response = await axios.get('http://localhost:5001/api/appointments/recent', {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    // Filter for completed bookings
                    const completedBookings = response.data.filter(booking => 
                        booking.status === 'Completed'
                    );

                    setRecentBookings(completedBookings); // Set recent bookings
                } catch (error) {
                    console.error('Error fetching recent bookings:', error);
                }
            }
        };

        fetchRecentBookings(); // Fetch recent bookings
    }, [userType]);

    return (
        <div className="card">
            <h2>Recent Bookings</h2>
            <div className="activities-grid">
                {recentBookings.length > 0 ? (
                    recentBookings.map(booking => (
                        <div className="booking-card" key={booking._id}>
                            <h4>User: {booking.user.name || 'Unnamed Client'}</h4>
                            <p>Service: {booking.service.title}</p>
                            <p>Date: {new Date(booking.date).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No recent bookings.</p>
                )}
            </div>
        </div>
    );
};

RecentBookingsCard.propTypes = {
    userType: PropTypes.string.isRequired, // Ensure userType is declared as required
};

export default RecentBookingsCard;