// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes

const RecentActivitiesCard = ({ userType }) => {
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        const fetchRecentActivities = async () => {
            const token = localStorage.getItem('token'); // Get the user token
            try {
                const response = await axios.get('http://localhost:5001/api/users/appointments', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Get the current date for comparison
                const currentDate = new Date();
                const filteredAppointments = response.data.filter(appointment => 
                    new Date(appointment.date) < currentDate || appointment.service.completed
                );

                setRecentActivities(filteredAppointments); // Set filtered recent activities
            } catch (error) {
                console.error('Error fetching recent activities:', error);
            }
        };

        if (userType === 'Client') {
            fetchRecentActivities(); // Only fetch if the user is a client
        }
    }, [userType]);

    return (
        <div className="card">
            <h2>Recent Activities</h2>
            {recentActivities.length > 0 ? (
                recentActivities.map(appointment => (
                    <div key={appointment._id}>
                        <p>Service: {appointment.service.title}</p>
                        <p>Date: {new Date(appointment.date).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <p>No recent activities.</p>
            )}
        </div>
    );
};

// Define prop types
RecentActivitiesCard.propTypes = {
    userType: PropTypes.string.isRequired, // userType is a required string
};

export default RecentActivitiesCard;
