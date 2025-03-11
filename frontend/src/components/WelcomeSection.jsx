// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import RandomServiceCard from './RandomServiceCard';
import CTASection from './CTASection';
import services from '../api/ServiceData';

const WelcomeSection = () => {
    const [randomServices, setRandomServices] = useState([]); 
    const [currentService, setCurrentService] = useState('...'); 

    const getRandomServices = () => {
        const shuffledServices = services.sort(() => Math.random() - 0.5);
        const selectedServices = shuffledServices.slice(0, 3);
        setRandomServices(selectedServices);
    };

    useEffect(() => {
        getRandomServices();
    }, []);

    const getRandomServiceTitle = () => {
        if (randomServices.length > 0) {
            const randomIndex = Math.floor(Math.random() * randomServices.length);
            setCurrentService(randomServices[randomIndex].title);
        }
    };

    return (
        <section className="header-and-welcome">
            <div className="welcome-content">
                {/* Random Services Container on the Left */}
                <div className="random-services">
                    {randomServices.map((service) => (
                        <RandomServiceCard 
                            key={service._id}
                            image={service.image}
                            link={service.link}
                        />
                    ))}
                </div>
                {/* Titles Section on the Right */}
                <div className="header-titles">
                    <div className="Header-title">
                        <h2 className="olso-title">.olso is also</h2>
                        <h2 className="random-services-text" onClick={getRandomServiceTitle}>
                            {currentService}
                        </h2>
                        <h3 className="header-click">click to find out</h3>
                    </div>
                </div>
            </div>
            <CTASection />
        </section>
    );
};

export default WelcomeSection;