// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/BookService.css';
import api from '../api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ service, hours, date, time, setError, setSuccess, setLoading, resetForm, loading }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found, please log in again.');
            setLoading(false);
            return;
        }

        // Validate inputs
        if (!hours || hours <= 0) {
            setError('Please enter a valid number of hours.');
            setLoading(false);
            return;
        }
        if (!date || !time) {
            setError('Please select a date and time.');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(
                '/api/payments/create-payment-intent',
                { serviceId: service._id, hours },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { clientSecret } = response.data;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) },
            });

            if (result.error) {
                setError(result.error.message);
                setLoading(false);
                return;
            }

            const bookingResponse = await api.post(
                '/api/appointments/bookings',
                {
                    serviceId: service._id,
                    hours: Number(hours),
                    date,
                    time,
                    paymentIntentId: result.paymentIntent.id,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (bookingResponse.status === 201) {
                setSuccess(`Successfully booked ${service.title} for ${hours} hours on ${date} at ${time}.`);
                resetForm();
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            const errorMessage = error.response
                ? error.response.data.message
                : 'Failed to confirm booking. Please check your inputs.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-form">
            <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            <button
                type="button"
                onClick={handlePayment}
                className="button"
                disabled={!stripe || !elements || loading}
            >
                {loading ? 'Processing...' : 'Pay and Confirm Booking'}
            </button>
        </div>
    );
};

const BookService = ({ service, hours, setHours }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setHours('');
        setDate('');
        setTime('');
    };

    const totalCost = hours && hours > 0 ? (service.price * hours).toFixed(2) : '0.00';

    return (
        <div className="booking-form-container">
            <h3>Book {service.title}</h3>
            <p>Price per hour: ${service.price.toFixed(2)}</p>
            <p>Total Cost: ${totalCost}</p>
            <form className="booking-form">
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

                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        service={service}
                        hours={hours}
                        date={date}
                        time={time}
                        setError={setError}
                        setSuccess={setSuccess}
                        setLoading={setLoading}
                        resetForm={resetForm}
                        loading={loading}
                    />
                </Elements>
            </form>
        </div>
    );
};

BookService.propTypes = {
    service: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        providerName: PropTypes.string, // Made optional
        price: PropTypes.number.isRequired,
    }).isRequired,
    hours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setHours: PropTypes.func.isRequired,
};

export default BookService;