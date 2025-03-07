// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const services = [
  'Dog Walking',
  'Babysitting',
  'Home Cleaning',
  'Handyman Services',
  'Tutoring',
  'Pet Sitting',
  'Freelance Services',
  'Delivery Services',
  'Beauty Services',
  'Fitness Training',
  'Home Cooking',
  'Photography',
  'Moving/Packing Help',
  'Gardening and Lawn Care',
  'Event Planning',
  'Personal Shopping',
  'Elderly Care',
  'Translation Services',
  'Music Lessons',
  'Home Organization',
  'Virtual Assistance',
  'Car Washing & Detailing',
  'Tech Support',
  'Bike Repair',
  'Crafts and Handmade Goods',
];

const WelcomeSection = () => {
  const [currentService, setCurrentService] = useState(services[0]); // Default to the first service

  const getRandomService = () => {
    const randomIndex = Math.floor(Math.random() * services.length);
    setCurrentService(services[randomIndex]);
  };

  return (
    <section className="welcome-section">
      <h1 className="welcome-title">OLSO IS ALSO</h1>
      <h2 
        className="current-service"
        onMouseEnter={getRandomService} // Change service on hover
      >
        {currentService}
      </h2>
    </section>
  );
};

export default WelcomeSection;