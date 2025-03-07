// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../styles/ServiceGallery.css'; 
import services from '../api/ServiceData'; // Correct import path to ServiceData
import ServiceCard from './ServiceCard'; // Import the ServiceCard component

const ServiceGallery = () => {
    return (
        <div className="service-card-container">
            {services.map(service => (
                <ServiceCard key={service._id} service={service} /> // Render each ServiceCard with the service data
            ))}
        </div>
    );
};

export default ServiceGallery;