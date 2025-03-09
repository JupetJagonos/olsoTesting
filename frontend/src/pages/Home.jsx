// eslint-disable-next-line no-unused-vars
import React from 'react';
import WelcomeSection from '../components/WelcomeSection';
// import CTASection from '../components/CTASection';
import SearchBar from '../components/SearchBar'; // Import SearchBar
import ServiceGallery from '../components/ServiceGallery';
import '../styles/Home.css'; // Ensure CSS is imported

const Home = () => {
  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/services?query=${query}`);
      const results = await response.json();
      console.log('Search results:', results);
      // Here, you can set results to a state and display them accordingly
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <div>
      <WelcomeSection />
      <SearchBar onSearch={handleSearch} /> {/* Add Search Bar here */}
      <ServiceGallery />
    </div>
  );
};

export default Home;
