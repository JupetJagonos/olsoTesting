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
        category: service.category
    });
    const [isBooking, setIsBooking] = useState(false); // State for booking the service
    const [hours, setHours] = useState(1); // Default number of hours for booking

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(
                `/api/services/${service._id}`, 
                updatedService, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            onServiceUpdated(response.data); // Call the parent handler to update the state
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await api.delete(`/api/services/${service._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onServiceDeleted(service._id); // Call the parent handler to remove this service
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const handleBookClick = () => {
        setIsBooking((prev) => !prev); // Toggle booking form visibility
    };

    const categoryService = services.find(srv => srv.category === service.category);
    const imageUrl = categoryService ? categoryService.image : ''; // Fallback for image URL

    return (
        <div 
            className="service-card" 
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }} // Set background image
        >
            {isEditing ? (
                <div className="edit-service">
                    <input
                        type="text"
                        value={updatedService.title}
                        onChange={(e) => setUpdatedService({ ...updatedService, title: e.target.value })}
                        placeholder="Service Title"
                    />
                    <textarea
                        value={updatedService.description}
                        onChange={(e) => setUpdatedService({ ...updatedService, description: e.target.value })}
                        placeholder="Service Description"
                    />
                    <input
                        type="number"
                        value={updatedService.price}
                        onChange={(e) => setUpdatedService({ ...updatedService, price: Number(e.target.value) })}
                        placeholder="Price"
                    />
                    <input
                        type="text"
                        value={updatedService.category}
                        onChange={(e) => setUpdatedService({ ...updatedService, category: e.target.value })}
                        placeholder="Category"
                    />
                    <button className="btn" onClick={handleUpdate}>Save Changes</button>
                    <button className="btn" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="card-content">
                    <h2 className="card-title">{service.title}</h2>
                    <p className="card-description">{service.description}</p>
                    <p className="card-category">Category: {service.category}</p>
                    <p className="card-provider">Provider: {service.providerName || 'N/A'}</p>
                    <p className="card-price">Price: ${service.price} / hour</p>

                    {/* Show Edit and Cancel buttons only if the user is the provider of the service */}
                    {userType === 'Provider' && (
                        <div className="button-group">
                            <button className="btn" onClick={() => setIsEditing(true)}>Edit Service</button>
                            <button className="btn" onClick={handleDelete}>Cancel</button>
                        </div>
                    )}

                    {/* Booking button for everyone */}
                    <div className="button-group">
                        <button className="btn" onClick={handleBookClick}>
                            {isBooking ? 'Cancel Booking'     : 'Book Service'}
                        </button>
                    </div>

                    {/* Render the booking form if isBooking is true */}
                    {isBooking && (
                        <div className="overlay">
                            <BookService 
                                service={service} 
                                hours={hours} 
                                setHours={setHours} 
                            /> {/* Render the BookService component */}
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
        providerName: PropTypes.string, // Optional for service
        price: PropTypes.number.isRequired,
        provider: PropTypes.string.isRequired, // Added provider ID for ownership check
    }).isRequired,
    userType: PropTypes.string.isRequired, // Check if the user is a provider
    onServiceUpdated: PropTypes.func.isRequired, // Function to call when the service is updated
    onServiceDeleted: PropTypes.func.isRequired, // Function to call when the service is deleted
};

export default ServiceCard;