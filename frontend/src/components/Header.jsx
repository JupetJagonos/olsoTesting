// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom"; 
import logo from "../assets/img/Logo/OlsoLogoNameWhite.png"; 
import '../styles/Header.css'; // Import the CSS file

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbaritem">
        {/* Navbar Links */}
        <div className="navbar-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/about" className="nav-link">About OLSO</Link>
        </div>
        {/* Logo Section */}
        <Link to="/" className="navbar-brand">
          <img 
            src={logo} 
            alt="Logo" 
            style={{ height: '80px', width: '80px' }} 
          />
        </Link>
        {/* Authentication Buttons */}
        <div className="Auth-btn">
          <Link to="/Login">
            <button className="btn1">Log In</button>
          </Link>
          <Link to="/Registration">
            <button className="btn2">Register</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;