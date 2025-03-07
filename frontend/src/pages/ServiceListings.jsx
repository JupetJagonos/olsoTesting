// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import ServiceCard from '../components/ServiceCard'; 
import SearchBar from '../components/SearchBar'; 
import ServiceCategoryFilter from '../components/ServiceCategoryFilter'; 
import CreateService from './CreateService'; 
import '../styles/ServiceGallery.css'; 

const ServiceListings = () => {
    const [services, setServices] = useState([]); 
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userType = localStorage.getItem('userType'); // Fetch userType from local storage

    const categories = [
        'Pet Services',
        'Child and Elderly Care',
        'Home Services',
        'Educational Services',
        'Freelance and Creative Services',
        'Food and Cooking Services',
        'Health and Fitness Services',
        'Support Services',
        'Vehicle Services',
    ];

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/services');
                setServices(response.data); 
                setFilteredServices(response.data); 
            } catch (err) {
                console.error('Error fetching services:', err);
                setError('Failed to load services.'); // Set error message
            } finally {
                setLoading(false);
            }
        };

        fetchServices(); 
    }, []);

    const handleSearch = (query) => {
        const filtered = services.filter(service =>
            service.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredServices(filtered);
    };

    const handleCategorySelect = (category) => {
        if (category) {
            const filtered = services.filter(service => service.category === category);
            setFilteredServices(filtered); 
        } else {
            setFilteredServices(services); 
        }
    };

    const handleServiceCreated = (newService) => {
        setServices(prevServices => [...prevServices, newService]);
        setFilteredServices(prevFiltered => [...prevFiltered, newService]);
    };

    if (loading) return <div>Loading services...</div>; 
    if (error) return <div className="error">{error}</div>; 

    return (
        <div className="service-listing-container">
            <h1>Available Services</h1>
            <ServiceCategoryFilter categories={categories} onCategorySelect={handleCategorySelect} />
            <CreateService onServiceCreated={handleServiceCreated} userType={userType} /> {/* Pass userType prop */}
            <SearchBar onSearch={handleSearch} />
            <div className="service-card-container">
                {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))
                ) : (
                    <p>No services available.</p>
                )}
            </div>
        </div>
    );
};

export default ServiceListings;
