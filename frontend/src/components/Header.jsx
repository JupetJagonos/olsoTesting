// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom"; 
import '../styles/Header.css'; // Import the CSS file

const Header = () => {
    return (
        <div className="header-container">
            <header className="header">
                <div className="background-blur" /> {/* Background blur effect */}
                <div className="navigation-links">
                    {/* Homepage Link */}
                    <Link to="/" className="homepage-link">
                        <div className="nav-item">
                            <div className="nav-item-number">1</div>
                            <div className="nav-item-name">.olso</div>
                        </div>
                        <p className="nav-description">this is also a homepage</p>
                    </Link>

                    <div className="other-links">
                        {/* Dashboard Link */}
                        <Link to="/dashboard" className="dashboard-link">
                            <div className="nav-item">
                                <div className="nav-item-number">2</div>
                                <div className="nav-item-name">.dashboard</div>
                            </div>
                            <p className="nav-description">this is also a dashboard</p>
                        </Link>

                        {/* Service Link */}
                        <Link to="/services" className="service-link">
                            <div className="nav-item">
                                <div className="nav-item-number">3</div>
                                <div className="nav-item-name">.service</div>
                            </div>
                            <p className="nav-description">this is also a service page</p>
                        </Link>

                        {/* About Link */}
                        <Link to="/about" className="about-link">
                            <div className="nav-item">
                                <div className="nav-item-number">4</div>
                                <div className="nav-item-name">.about</div>
                            </div>
                            <p className="nav-description">this is also an about page</p>
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;