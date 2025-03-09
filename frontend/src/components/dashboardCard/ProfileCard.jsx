// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const ProfileCard = ({ userData }) => {
    return (
        <div className="card">
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