// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // To access location

import ServiceCard from '../components/ServiceCard'; 
import SearchBar from '../components/SearchBar'; 
import ServiceCategoryFilter from '../components/ServiceCategoryFilter'; 
import CreateService from './CreateService'; 
import '../styles/ServiceGallery.css'; 
import api from '../api';

const ServiceListings = () => {
    const { state } = useLocation(); // Get the passed state (if any)
    const selectedCategory = state ? state.selectedCategory : null; // Extract selected category

    const [services, setServices] = useState([]); 
    const [filteredServices, setFilteredServices] = useState([]);
    const [categories, setCategories] = useState([]); // State for available categories
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userType = localStorage.getItem('userType'); // Fetch userType from local storage

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/api/services');
                setServices(response.data);
                setFilteredServices(response.data); 
                
                // Extract unique categories from the service data
                const uniqueCategories = [...new Set(response.data.map(service => service.category))];
                setCategories(uniqueCategories); // Set categories state
            } catch (err) {
                console.error('Error fetching services:', err);
                setError('Failed to load services.'); 
            } finally {
                setLoading(false); 
            }
        };

        fetchServices(); 
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = services.filter(service => service.category === selectedCategory);
            setFilteredServices(filtered);
        } else {
            setFilteredServices(services); // Reset to default if no category is selected
        }
    }, [selectedCategory, services]); // Dependencies on services and selected category

    const handleSearch = (query) => {
        const filtered = services.filter(service =>
            service.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredServices(filtered);
    };

    const handleCategorySelect = (category) => {
        const filtered = services.filter(service => service.category === category);
        setFilteredServices(filtered); 
    };

    const handleServiceCreated = (newService) => {
        setServices((prevServices) => [...prevServices, newService]);
        setFilteredServices((prevFiltered) => [...prevFiltered, newService]);
    };

    const handleServiceUpdated = (updatedService) => {
        setServices((prevServices) =>
            prevServices.map(service =>
                service._id === updatedService._id ? updatedService : service
            )
        );
        setFilteredServices((prevFiltered) =>
            prevFiltered.map(service =>
                service._id === updatedService._id ? updatedService : service
            )
        );
    };

    const handleServiceDeleted = (serviceId) => {
        setServices((prevServices) => prevServices.filter(service => service._id !== serviceId));
        setFilteredServices((prevFiltered) => prevFiltered.filter(service => service._id !== serviceId));
    };

    if (loading) return <div>Loading services...</div>; 
    if (error) return <div className="error">{error}</div>; 

    return (
        <div className="service-listing-container">
            <h1>Available Services</h1>
            <ServiceCategoryFilter 
                categories={categories} // Pass populated categories here
                onCategorySelect={handleCategorySelect} 
            />
            <SearchBar onSearch={handleSearch} />
           
            <div className="service-card-container">
                {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <ServiceCard 
                            key={service._id} 
                            service={service} 
                            userType={userType}  // Pass the userType down to the ServiceCard
                            onServiceUpdated={handleServiceUpdated} 
                            onServiceDeleted={handleServiceDeleted}
                        />
                    ))
                ) : (
                    <p>No services available.</p>
                )}
            </div>
            <div className="create-service-container"> {/* Added space for CreateService */}
                <CreateService 
                    onServiceCreated={handleServiceCreated} 
                    userType={userType} 
                />
            </div>
        </div>
    );
};

export default ServiceListings;