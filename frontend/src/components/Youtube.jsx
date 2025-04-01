// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/YouTubeVideo.css'; 

const YouTubeVideo = ({ videoId }) => {
    if (!videoId) {
        return <p>Video not available.</p>;
    }
    return (
        <div className="youtube-video-container">
            <iframe
                width="100%" 
                height="315" 
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
};

YouTubeVideo.propTypes = {
    videoId: PropTypes.string.isRequired
}

export default YouTubeVideo;