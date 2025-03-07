// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateService from './CreateService'; // Import CreateService component
import ServiceCard from '../components/ServiceCard'; // To display suggested services
import '../styles/dashboard.css'; // Import your dashboard styles

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [appointments, setAppointments] = useState([]); // For upcoming activities
    const [recentActivities, setRecentActivities] = useState([]); // For recent activities
    const [suggestedServices, setSuggestedServices] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]); // For upcoming bookings
    const userType = localStorage.getItem('userType'); // Fetch user type from local storage
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token'); // Get the user token
            try {
                const response = await axios.get('http://localhost:5001/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data); // Set user data fetched from API
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        const fetchAppointments = async () => {
            const token = localStorage.getItem('token'); // Get the user token
            try {
                const res = await axios.get('http://localhost:5001/api/users/appointments', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAppointments(res.data); // Set appointments
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        const fetchRecentActivities = async () => {
            const token = localStorage.getItem('token'); // Get the user token
            try {
                const res = await axios.get('http://localhost:5001/api/users/activities', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRecentActivities(res.data); // Set recent activities
            } catch (error) {
                console.error('Error fetching recent activities:', error);
            }
        };

        const fetchSuggestedServices = async () => {
            const token = localStorage.getItem('token'); // Get the user token
            try {
                const res = await axios.get('http://localhost:5001/api/services', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSuggestedServices(res.data.slice(0, 3)); // Limit to 3 suggested services
            } catch (error) {
                console.error('Error fetching suggested services:', error);
            }
        };

        const fetchUpcomingBookings = async () => {
            const token = localStorage.getItem('token'); // Get the user token
            try {
                const response = await axios.get('http://localhost:5001/api/users/upcoming-bookings', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUpcomingBookings(response.data); // Set upcoming bookings
            } catch (error) {
                console.error('Error fetching upcoming bookings:', error);
            }
        };
        
        fetchUserProfile(); // Fetch user profile
        fetchAppointments(); // Fetch upcoming appointments
        fetchRecentActivities(); // Fetch recent activities
        fetchSuggestedServices(); // Fetch suggested services
        fetchUpcomingBookings(); // Fetch upcoming bookings
    }, [userType]);

    return (
        <div className="dashboard-container">
            <h1>Welcome to Your Dashboard!</h1>

            {/* Profile Details Section */}
            <div className="card">
                <h2>Profile Details</h2>
                {userData && <p>Name: {userData.name}</p>}
            </div>

            {/* Upcoming Activities Section */}
            <div className="card">
                <h2>Upcoming Activities</h2>
                {appointments.length > 0 ? (
                    appointments.map(appointment => (
                        <div key={appointment._id}>
                            <p>Service: {appointment.service.title}</p>
                            <p>Date: {new Date(appointment.date).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No upcoming activities.</p>
                )}
            </div>

            {/* Recent Activities Section */}
            <div className="card">
                <h2>Recent Activities</h2>
                {recentActivities.length > 0 ? (
                    recentActivities.map(activity => (
                        <div key={activity._id}>
                             <p>Activity: {activity.description}</p>
                            <p>Date: {new Date(activity.date).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No recent activities.</p>
                )}
            </div>

            {/* Upcoming Bookings Section */}
            <div className="upcoming-bookings">
                <h2>Upcoming Bookings</h2>
                {upcomingBookings.length > 0 ? (
                    <ul>
                        {upcomingBookings.map(booking => (
                            <li key={booking._id}>
                                <p>User: {booking.userName}</p>
                                <p>Service: {booking.service.title}</p>
                                <p>Date: {new Date(booking.date).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No upcoming bookings.</p>
                )}
            </div>

            {/* Suggested Services Section */}
            <div className="suggested-services">
                <h2>Suggested Services</h2>
                {suggestedServices.length > 0 ? (
                    suggestedServices.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))
                ) : (
                    <p>No suggested services available.</p>
                )}
            </div>

            {/* Create Service Section for Providers */}
            {userType === 'Provider' && (
                <div className="full-width-card">
                    <CreateService onServiceCreated={(newService) => {
                        setSuggestedServices((prevServices) => {
                            // Ensure the new service is added to the list
                            if (!prevServices.find(service => service._id === newService._id)) {
                                return [...prevServices, newService];
                            }
                            return prevServices; // Return existing array
                        });
                    }} userType={userType} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;