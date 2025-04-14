// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import clientBanner from '../../assets/img/ServiceImg/ClientBanner.jpg'; // Corrected import path
import serviceProviderBanner from '../../assets/img/ServiceImg/ServiceProviderBanner.jpg'; // Corrected import path

const ProfileCard = ({ userData }) => {
    // Determine the appropriate background image based on user type
    const backgroundImage = userData?.userType === 'Client' ? clientBanner : serviceProviderBanner;

    return (
        <div 
            className="card-profile frosted-glass" 
            style={{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                color: 'white' // Text color for visibility against the background
            }} 
        >
            <h2>Profile Details</h2>
            {userData && <p>Name: {userData.name}</p>}
            {userData && <p>User Type: {userData.userType}</p>}
        </div>
    );
};

ProfileCard.propTypes = {
    userData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        userType: PropTypes.string.isRequired,
    }),
};

export default ProfileCard;