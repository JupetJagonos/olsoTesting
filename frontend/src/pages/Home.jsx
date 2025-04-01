// eslint-disable-next-line no-unused-vars
import React from 'react';
import WelcomeSection from '../components/WelcomeSection';
import SearchBar from '../components/SearchBar'; 
import ServiceGallery from '../components/ServiceGallery'; // Ensure this is imported
import YouTubeVideo from '../components/Youtube';
import '../styles/Home.css'; 

const Home = () => {
    const handleSearch = async (query) => {
        try {
            const response = await fetch(`/api/services?query=${query}`);
            const results = await response.json();
            console.log('Search results:', results);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    return (
        <div>
            <WelcomeSection />
            <SearchBar onSearch={handleSearch} /> 
            <ServiceGallery /> {/* This now shows category cards */}
            <YouTubeVideo />
        </div>
    );
};

export default Home;
