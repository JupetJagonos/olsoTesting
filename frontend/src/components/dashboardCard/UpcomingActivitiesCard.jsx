// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const UpcomingActivitiesCard = ({ userType }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = localStorage.getItem('token'); // Get the user token
            if (userType === 'Client') {
                try {
                    const response = await axios.get('http://localhost:5001/api/users/appointments', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setAppointments(response.data); // Set appointments
                } catch (error) {
                    console.error('Error fetching appointments:', error);
                }
            }
        };

        fetchAppointments(); // Fetch appointments
    }, [userType]);

    return (
        <div className="card">
            <h2>Upcoming Activities</h2>
            {appointments.length > 0 ? (
                appointments.map(appointment => (
                    <div key={appointment._id}>
                        <p>Service: {appointment.service.title}</p>
                        <p>Date: {new Date(appointment.date).toLocaleString()}</p>
                        <p>Status: {appointment.status}</p>
                    </div>
                ))
            ) : (
                <p>No upcoming activities.</p>
            )}
        </div>
    );
};

UpcomingActivitiesCard.propTypes = {
    userType: PropTypes.string.isRequired,
};

export default UpcomingActivitiesCard;
