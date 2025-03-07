// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="cta-section">
      <h2 className="cta-title">Be Part of the OLSO Community</h2>
      <div className="d-flex justify-content-center">
        <Link to="/Login">
          <button className="btn btn-outline-light me-2">Log In</button>
        </Link>
        <Link to="/Registration">
          <button className="btn btn-primary">Register</button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;