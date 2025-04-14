// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import ServiceCard from '../ServiceCard'; // Import the ServiceCard to display individual services
import '../../styles/dashboard.css'; // Ensure the CSS is imported

const SuggestedServicesCard = ({ suggestedServices }) => {
    return (
        <div className="suggested-services">
            <h2>Suggested Services</h2>
            <div className="services-grid"> {/* Add a wrapper for services with grid/flex layout */}
                {suggestedServices.length > 0 ? (
                    suggestedServices.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))
                ) : (
                    <p>No suggested services available.</p>
                )}
            </div>
        </div>
    );
};

SuggestedServicesCard.propTypes = {
    suggestedServices: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            // more fields if necessary
        })
    ).isRequired,
};

export default SuggestedServicesCard;