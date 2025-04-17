// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ServiceDetail.css';
import api from '../api';

const ServiceDetail = () => {
    const { id } = useParams(); // Obtain the service id from the URL parameters
    const [service, setService] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const response = await api.get(`/api/services/${id}`); // Make request to get service details
                setService(response.data); // Set the service data
            } catch (err) {
                console.error('Failed to load service details:', err);
                setError('Error loading service details.'); // Set an appropriate error message
            } finally {
                setLoading(false); // Ensure loading is set to false
            }
        };

        fetchServiceDetail(); // Call the function to fetch service details
    }, [id]);

    if (loading) return <div>Loading service details...</div>; 
    if (error) return <div className="error">{error}</div>; // Display error message if there is one

    return (
        <div className="service-detail-container">
            <h1>{service.title}</h1>
            <img src={service.image} alt={service.title} className="service-image" /> {/* Display the service image */}
            <p>{service.description}</p>
            <p>Category: {service.category}</p>
            {/* Additional details and functionalities can be added here */}
        </div>
    );
};

export default ServiceDetail;