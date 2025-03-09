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
                <div className="random-services">
                    {randomServices.map((service) => (
                        <RandomServiceCard 
                            key={service._id}
                            image={service.image}
                            link={service.link}
                        />
                    ))}
                </div>
                
                <h2 
                    className="olso-title" 
                    // Change to click event
                >
                    .olso is also
                </h2>
                
                <h2 className="random-services-text" onClick={getRandomServiceTitle}>{currentService}</h2>
            </div>

            <CTASection />
        </section>
    );
};

export default WelcomeSection;