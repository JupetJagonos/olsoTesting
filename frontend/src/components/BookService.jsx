// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import axios from 'axios'; // Import Axios for making HTTP requests
import '../styles/BookService.css'; // Import the CSS for styling the BookService component

const BookService = ({ service, hours, setHours }) => {
    const [date, setDate] = useState(''); // State for the selected date
    const [time, setTime] = useState(''); // State for the selected time
    const [error, setError] = useState(''); // Error message state
    const [success, setSuccess] = useState(''); // Success message state

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
            setError('No token found, please log in again.');
            return;
        }

        try {
            const bookingData = {
                serviceId: service._id, // Pass the service ID
                hours: hours,
                date: date,
                time: time,
            };

            const response = await axios.post('http://localhost:5001/api/appointments/bookings', bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include JWT token in header
                }
            });

            // Check for successful response
            if (response.status === 201) {
                setSuccess(`Successfully booked ${service.title} for ${hours} hours on ${date} at ${time}.`);
                setError(''); // Clear error messages if booking was successful
                // Optional: You may want to perform additional actions, like resetting inputs or navigating
            }
        } catch (error) {
            console.error('Error booking service:', error);
            const errorMessage = error.response?.data?.message || 'Failed to confirm booking. Please try again.';
            setError(errorMessage); // Set error message
            setSuccess(''); // Clear previous success messages
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
                    required // Ensure this field is required
                />
            </label>

            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required // Make this field required
                />
            </label>

            <label>
                Time:
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required // Ensure this field is required
                />
            </label>

            {error && <p className="error">{error}</p>} {/* Display error messages */}
            {success && <p className="success">{success}</p>} {/* Display success messages */}

            <button type="submit" className="button">Confirm Booking</button>
        </form>
    );
};

// Define PropTypes
BookService.propTypes = {
    service: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        providerName: PropTypes.string.isRequired, // Required for provider's name
        price: PropTypes.number.isRequired, // Required for service price
    }).isRequired,
    hours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Accepts a string or a number for hours
    setHours: PropTypes.func.isRequired, // Function to set hours
};

export default BookService;