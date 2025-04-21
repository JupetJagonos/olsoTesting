// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/ServiceCard.css';
import services from '../api/ServiceData'; // Import service images
import BookService from './BookService'; // Import the BookService component
import api from '../api';

const ServiceCard = ({ service, userType, onServiceUpdated, onServiceDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedService, setUpdatedService] = useState({
        title: service.title,
        description: service.description,
        price: service.price,
        category: service.category,
    });
    const [isBooking, setIsBooking] = useState(false);
    const [hours, setHours] = useState('1'); // Default to string '1' to match input type

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(
                `/api/services/${service._id}`,
                updatedService,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            onServiceUpdated(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await api.delete(`/api/services/${service._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onServiceDeleted(service._id);
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const handleBookClick = () => {
        setIsBooking((prev) => !prev);
        if (isBooking) {
            setHours('1'); // Reset hours when closing
        }
    };

    const categoryService = services.find((srv) => srv.category === service.category);
    const imageUrl = categoryService ? categoryService.image : ''; // Fallback for image URL

    return (
        <div
            className="service-card"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {isEditing ? (
                <div className="edit-service">
                    <input
                        type="text"
                        value={updatedService.title}
                        onChange={(e) => setUpdatedService({ ...updatedService, title: e.target.value })}
                        placeholder="Service Title"
                        required
                    />
                    <textarea
                        value={updatedService.description}
                        onChange={(e) => setUpdatedService({ ...updatedService, description: e.target.value })}
                        placeholder="Service Description"
                        required
                    />
                    <input
                        type="number"
                        value={updatedService.price}
                        onChange={(e) => setUpdatedService({ ...updatedService, price: Number(e.target.value) })}
                        placeholder="Price"
                        min="0"
                        step="0.01"
                        required
                    />
                    <input
                        type="text"
                        value={updatedService.category}
                        onChange={(e) => setUpdatedService({ ...updatedService, category: e.target.value })}
                        placeholder="Category"
                        required
                    />
                    <button className="btn" onClick={handleUpdate}>
                        Save Changes
                    </button>
                    <button className="btn" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="card-content">
                    <h2 className="card-title">{service.title}</h2>
                    <p className="card-description">{service.description}</p>
                    <p className="card-category">Category: {service.category}</p>
                    <p className="card-provider">Provider: {service.providerName || 'N/A'}</p>
                    <p className="card-price">Price: ${service.price.toFixed(2)} / hour</p>

                    {userType === 'Provider' && (
                        <div className="button-group">
                            <button className="btn" onClick={() => setIsEditing(true)}>
                                Edit Service
                            </button>
                            <button className="btn" onClick={handleDelete}>
                                Delete Service
                            </button>
                        </div>
                    )}

                    <div className="button-group">
                        <button className="btn" onClick={handleBookClick}>
                            {isBooking ? 'Close Booking' : 'Book Service'}
                        </button>
                    </div>

                    {isBooking && (
                        <div className="booking-overlay">
                            <div className="booking-content">
                                <button
                                    className="close-button"
                                    onClick={handleBookClick}
                                    aria-label="Close booking form"
                                >
                                    &times;
                                </button>
                                <BookService service={service} hours={hours} setHours={setHours} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

ServiceCard.propTypes = {
    service: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        providerName: PropTypes.string, // Optional, derived from User model
        price: PropTypes.number.isRequired,
        provider: PropTypes.string.isRequired, // User ID
    }).isRequired,
    userType: PropTypes.string.isRequired,
    onServiceUpdated: PropTypes.func.isRequired,
    onServiceDeleted: PropTypes.func.isRequired,
};

export default ServiceCard;