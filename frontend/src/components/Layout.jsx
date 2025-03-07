// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import Header from './Header';
import Footer2 from './Library/Footer2';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="content">{children}</main>
      <Footer2 />
    </div>
  );
};

// Define prop types
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a required node
};

export default Layout;