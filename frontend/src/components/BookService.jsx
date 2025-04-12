// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../styles/BookService.css';

const BookService = ({ service, hours, setHours }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found, please log in again.');
            setLoading(false);
            return;
        }

        const bookingData = {
            serviceId: service._id,
            hours: Number(hours), // Ensure hours is a number
            date,
            time,
        };

        try {
            const response = await axios.post(
                'http://localhost:5001/api/appointments/bookings',
                bookingData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                setSuccess(`Successfully booked ${service.title} for ${hours} hours on ${date} at ${time}.`);
                // Reset fields
                setHours('');
                setDate('');
                setTime('');
            }
        } catch (error) {
            console.error('Error booking service:', error);
            const errorMessage = error.response 
                ? error.response.data.message 
                : 'Failed to confirm booking. Please check your inputs.';
            setError(errorMessage); // Set error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="booking-form">
            <label>
                Number of hours:
                <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    min="1"
                    placeholder="1"
                    required
                />
            </label>

            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label>

            <label>
                Time:
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </label>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit" className="button" disabled={loading}>
            {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
        </form>
    );
};

BookService.propTypes = {
    service: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        providerName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    hours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setHours: PropTypes.func.isRequired,
};

export default BookService;