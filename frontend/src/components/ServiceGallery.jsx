// eslint-disable-next-line no-unused-vars
import React from 'react';
import services from '../api/ServiceData'; // Import service data
import { Link } from 'react-router-dom'; // For navigation

const ServiceGallery = () => {
    // Create unique categories from services
    const categories = [...new Set(services.map(service => service.category))];

    return (
        <div className="service-card-container">
            {categories.map((category, index) => {
                // Find a representative service for the category to get the image
                const categoryService = services.find(service => service.category === category); // Get the first service for the category
                const imageUrl = categoryService ? categoryService.image : ''; // Safeguard for image URL

                return (
                    <Link 
                        to={`/services`} 
                        key={index} 
                        className="card"
                        state={{ selectedCategory: category }} // Pass the selected category as state
                        style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                        <div className="textBox">
                            <span className="head">{category}</span>
                        </div>
      ;              </Link>
                );
            })}
        </div>
    );
};

export default ServiceGallery