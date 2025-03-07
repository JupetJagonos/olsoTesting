// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bookService } from '../api/bookApi'; // Import the API function

const BookService = ({ service }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState(''); // Added state for time
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine date and time into a single datetime string (optional)
        const dateTime = new Date(`${date}T${time}`); 

        try {
            await bookService(service._id, dateTime.toISOString()); // Update with both
            setSuccess('Service booked successfully!'); // Show success message
            setDate(''); // Reset the date input
            setTime(''); // Reset the time input
        } catch (err) {
            setError('Failed to book service.'); // Show error message
            console.error('Error booking service:', err.response?.data); // Log error for debugging
        }
    };

    return (
        <div>
            <h2>Book Service: {service.title}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <input
                    type="time" // New input for time
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <button type="submit">Book Service</button>
                {success && <p>{success}</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

BookService.propTypes = {
    service: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default BookService;