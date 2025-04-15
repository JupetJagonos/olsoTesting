// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import services from '../api/ServiceData'; // Import your service data
import ServiceCard from '../components/ServiceCard';


const ServiceByCategory = () => {
    const { category } = useParams(); // Fetch category from URL parameters
    const filteredServices = services.filter(service => service.category === category);

    return (
        <div className="service-by-category">
            <h1>{category} Services</h1>
            <div className="service-gallery">
                {filteredServices.map(service => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default ServiceByCategory;