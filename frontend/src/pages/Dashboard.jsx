// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProfileCard from '../components/dashboardCard/ProfileCard';
import SuggestedServicesCard from '../components/dashboardCard/SuggestedServicesCard';
import UpcomingBookingsCard from '../components/dashboardCard/UpcomingBookingsCard';
import RecentBookingsCard from '../components/dashboardCard/RecentBookingsCard';
import ProviderUpcomingBookingsCard from '../components/dashboardCard/ProviderUpcomingBookingsCard';
import ProviderRecentBookingsCard from '../components/dashboardCard/ProviderRecentBookingsCard';
import CreateService from './CreateService';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);
    const [suggestedServices, setSuggestedServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const userType = localStorage.getItem('userType');

    // Use useCallback to memoize fetchData function
    const fetchData = useCallback(async () => {
        const token = localStorage.getItem('token');
        
        try {
            // Fetch user profile
            const userProfileResponse = await axios.get('http://localhost:5001/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(userProfileResponse.data);
    
            // Fetch suggested services
            const servicesResponse = await axios.get('http://localhost:5001/api/services', {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            const shuffledServices = servicesResponse.data.sort(() => 0.5 - Math.random()).slice(0, 3);
            setSuggestedServices(shuffledServices);
    
            // Conditional fetching of bookings based on user type
            if (userType === 'Provider') {
                const upcomingResponse = await axios.get('http://localhost:5001/api/appointments/provider/upcoming', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const recentResponse = await axios.get('http://localhost:5001/api/appointments/provider/recent', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUpcomingBookings(upcomingResponse.data);
                setRecentBookings(recentResponse.data);
            } else if (userType === 'Client') {
                const clientUpcomingResponse = await axios.get('http://localhost:5001/api/appointments/client/upcoming', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const clientRecentResponse = await axios.get('http://localhost:5001/api/appointments/client/recent', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUpcomingBookings(clientUpcomingResponse.data); 
                setRecentBookings(clientRecentResponse.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [userType]); // Add userType to dependencies to re-fetch if it changes

    useEffect(() => {
        fetchData(); // Call fetchData when the component mounts
    }, [fetchData]); // Add fetchData to the dependency array

    // Function to update booking status
    const updateBookingStatus = async (bookingId, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5001/api/appointments/${bookingId}/status`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Refresh bookings after update
            fetchData(); // Refresh the displayed data
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className="dashboard-container">
            <h1>{userType === 'Client' ? 'Client Dashboard' : 'Provider Dashboard'}</h1>

            {/* Profile Card */}
            <div className="profile-card card">
                <ProfileCard userData={userData} />
            </div>

            <div className="Services">
                <div className="activities-bookings-section">
                    <h2>Bookings</h2>
                    <div className="bookings-row">
                        {userType === 'Provider' ? (
                            <>
                                <div className="booking-container">
                                    <ProviderUpcomingBookingsCard 
                                        upcomingBookings={upcomingBookings} 
                                        onUpdateStatus={updateBookingStatus} // Pass update function
                                        />
                                         </div>
                                <div className="booking-container">
                                    <ProviderRecentBookingsCard 
                                        recentBookings={recentBookings} 
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="booking-container">
                                    <UpcomingBookingsCard 
                                        upcomingBookings={upcomingBookings} 
                                    />
                                </div>
                                <div className="booking-container">
                                    <RecentBookingsCard 
                                        recentBookings={recentBookings} 
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Service Section for Providers */}
            {userType === 'Provider' && (
                <CreateService
                    onServiceCreated={(newService) => {
                        setSuggestedServices((prevServices) => {
                            if (!prevServices.find((service) => service._id === newService._id)) {
                                return [...prevServices, newService];
                            }
                            return prevServices;
                        });
                    }}
                    userType={userType} // Ensure userType is passed to CreateService
                />
            )}
            <SuggestedServicesCard suggestedServices={suggestedServices} />
        </div>
    );
};

export default Dashboard;