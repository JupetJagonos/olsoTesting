// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const RecentBookingsCard = ({ userType }) => {
    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        const fetchRecentBookings = async () => {
            const token = localStorage.getItem('token'); 
            console.log("Token:", token); // Log the token for debugging

            if (userType === 'Provider') {
                try {
                    const response = await axios.get('http://localhost:5001/api/appointments/recent', { // Correct endpoint for fetching recent bookings
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    console.log('Response data:', response.data); // Log the response data
                    // Filter for completed bookings beyond the current date
                    const currentDate = new Date();
                    const completedBookings = response.data.filter(booking => 
                        booking.status === 'Completed' && new Date(booking.date) < currentDate
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
            {recentBookings.length > 0 ? (
                <ul>
                    {recentBookings.map(booking => (
                        <li key={booking._id}>
                            <p>User: {booking.user.name || 'Unnamed Client'}</p>
                            <p>Service: {booking.service.title}</p>
                            <p>Date: {new Date(booking.date).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recent bookings.</p>
            )}
        </div>
    );
};

RecentBookingsCard.propTypes = {
    userType: PropTypes.string.isRequired, // Ensure userType is declared as required
};

export default RecentBookingsCard;