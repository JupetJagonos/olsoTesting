// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration'; 
import Dashboard from './pages/Dashboard'; 
import ServiceListings from './pages/ServiceListings'; 
import ServiceDetail from './pages/ServiceDetail'; 
import CreateService from './pages/CreateService'; // Import CreateService
import Footer2 from './components/Library/Footer2'; 

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} /> 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/services" element={<ServiceListings />} /> {/* Service Listings */}
                <Route path="/service/:id" element={<ServiceDetail />} /> {/* Service Detail */}
                <Route path="/create-service" element={<CreateService onServiceCreated={() => {}} />} /> {/* Initialize with placeholder for onServiceCreated */}
            </Routes>
            <Footer2 />
        </Router>
    );
};

export default App;