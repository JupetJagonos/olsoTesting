// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CTAstyle.css'; // Import the new CTA styles

const CallToActionSection = () => {
  return (
    <section className="cta-call-to-action">
      <h2 className="cta-heading">Be Part of the OLSO Community</h2>
      <div className="cta-button-container">
        <Link to="/Login">
          <button className="cta-button btn-outline-light">Log In</button>
        </Link>
        <Link to="/Registration">
          <button className="cta-button btn-primary">Register</button>
        </Link>
      </div>
    </section>
  );
};

export default CallToActionSection;
