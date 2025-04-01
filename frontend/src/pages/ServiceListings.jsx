// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // To access location
import axios from 'axios'; 
import ServiceCard from '../components/ServiceCard'; 
import SearchBar from '../components/SearchBar'; 
import ServiceCategoryFilter from '../components/ServiceCategoryFilter'; 
import CreateService from './CreateService'; 
import '../styles/ServiceGallery.css'; 

const ServiceListings = () => {
    const { state } = useLocation(); // Get the passed state
    const selectedCategory = state ? state.selectedCategory : null; // Extract selected category

    const [services, setServices] = useState([]); 
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userType = localStorage.getItem('userType'); // Fetch userType from local storage

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/services');
                setServices(response.data); 
                setFilteredServices(response.data); 
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
        // Filter services based on the selected category
        if (selectedCategory) {
            const filtered = services.filter(service => service.category === selectedCategory);
            setFilteredServices(filtered);
        } else {
            setFilteredServices(services); // Reset to default if no category is selected
        }
    }, [selectedCategory, services]); // Dependency on services and selected category

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
        setServices(prevServices => [...prevServices, newService]);
        setFilteredServices(prevFiltered => [...prevFiltered, newService]);
    };

    if (loading) return <div>Loading services...</div>; 
    if (error) return <div className="error">{error}</div>; 

    return (
        <div className="service-listing-container">
            <h1>Available Services</h1>
            <ServiceCategoryFilter categories={[]} onCategorySelect={handleCategorySelect} />
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