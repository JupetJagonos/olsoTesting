// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration'; 
import Dashboard from './pages/Dashboard'; 
import ServiceListings from './pages/ServiceListings'; 
import ServiceDetail from './pages/ServiceDetail'; 
import CreateService from './pages/CreateService'; 
import Footer2 from './components/Library/Footer2'; 

const App = () => {
    const isLoggedIn = !!localStorage.getItem('token'); // Check for token presence
    const userType = localStorage.getItem('userType'); // Get the user type

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} /> 
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/services" element={isLoggedIn ? <ServiceListings /> : <Navigate to="/login" />} />
                <Route path="/service/:id" element={isLoggedIn ? <ServiceDetail /> : <Navigate to="/login" />} />
                <Route path="/create-service" element={isLoggedIn && userType === 'Provider' ? <CreateService onServiceCreated={() => {}} /> : <Navigate to="/login" />} />
            </Routes>
            <Footer2 />
        </Router>
    );
};

export default App;