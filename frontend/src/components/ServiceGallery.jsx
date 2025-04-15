// eslint-disable-next-line no-unused-vars
import React from 'react';
import services from '../api/ServiceData'; // Import service data
import { Link } from 'react-router-dom'; // For navigation
import '../styles/ServiceGallery.css';

const ServiceGallery = () => {
    // Create unique categories from services
    const categories = [...new Set(services.map(service => service.category))];

    return (
        <div className="landscape-card-container"> {/* Updated classname for container */}
            {categories.map((category, index) => {
                // Find a representative service for the category to get the image and description
                const categoryService = services.find(service => service.category === category); // Get the first service for the category
                const imageUrl = categoryService ? categoryService.image : ''; // Safeguard for image URL
                const description = categoryService ? categoryService.description : ''; // Safeguard for description

                return (
                    <Link 
                        to={`/services`} 
                        key={index} 
                        className="landscape-card" 
                        state={{ selectedCategory: category }} // Pass the selected category as state
                        style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                        <div className="textBox">
                            <span className="head">{category}</span>
                            <h2 className="service-description">{description}</h2> {/* New class name for description */}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default ServiceGallery;