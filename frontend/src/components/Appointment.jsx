// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5001/api/users/appointments', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAppointments(response.data);
            } catch (err) {
                setError('Error fetching appointments.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) return <p>Loading appointments...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Your Appointments</h2>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment._id}>
                        {appointment.service.title} on {new Date(appointment.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appointments;