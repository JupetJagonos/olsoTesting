// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from 'react';
import ProfileCard from '../components/dashboardCard/ProfileCard';
import SuggestedServicesCard from '../components/dashboardCard/SuggestedServicesCard';
import UpcomingBookingsCard from '../components/dashboardCard/UpcomingBookingsCard';
import RecentBookingsCard from '../components/dashboardCard/RecentBookingsCard';
import ProviderUpcomingBookingsCard from '../components/dashboardCard/ProviderUpcomingBookingsCard';
import ProviderRecentBookingsCard from '../components/dashboardCard/ProviderRecentBookingsCard';
import CreateService from './CreateService';
import '../styles/dashboard.css';
import api from '../api';

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
        console.log("Fetching data with token: ", token);

        if (!token) {
            console.error("No token found. User might not be logged in.");
            alert("You need to be logged in to view this data.");
            setLoading(false);
            return;
        }

        try {
            // Fetch user profile
            const userProfileResponse = await api.get('/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("User Profile Response: ", userProfileResponse.data);
            setUserData(userProfileResponse.data);

            // Fetch suggested services
            const servicesResponse = await api.get('/api/services', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Suggested Services Response: ", servicesResponse.data);

            const shuffledServices = servicesResponse.data.sort(() => 0.5 - Math.random()).slice(0, 3);
            setSuggestedServices(shuffledServices);

            // Fetch bookings based on user type
            let upcomingResponse, recentResponse;

            if (userType === 'Provider') {
                upcomingResponse = await api.get('/api/appointments/provider/upcoming', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                recentResponse = await api.get('/api/appointments/provider/recent', {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else if (userType === 'Client') {
                upcomingResponse = await api.get('/api/appointments/client/upcoming', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                recentResponse = await api.get('/api/appointments/client/recent', {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            console.log("Upcoming Bookings: ", upcomingResponse.data);
            console.log("Recent Bookings: ", recentResponse.data);

            setUpcomingBookings(upcomingResponse.data);
            setRecentBookings(recentResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [userType]);

    // Function to update booking status
    const updateBookingStatus = async (bookingId, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            await api.put(`/api/appointments/status`, { id: bookingId, status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchData(); // Refresh the displayed data after status update
        } catch (error) {
            console.error('Error updating booking status:', error);
            alert('An error occurred while updating the booking status. Check console for details.');
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData when the component mounts
    }, [fetchData]);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className="dashboard-container frosted-glass">
            <h1>{userType === 'Client' ? 'Client Dashboard' : 'Provider Dashboard'}</h1>

            {/* Profile Card */}
            <ProfileCard userData={userData} />

            {/* Booking Section */}
            <div className="activities-bookings-section">
                <h2>Bookings</h2>
                <div className="bookings-row">
                    {userType === 'Provider' ? (
                        <>
                            <ProviderUpcomingBookingsCard 
                                upcomingBookings={upcomingBookings} 
                                onUpdateStatus={updateBookingStatus} 
                            />
                            <ProviderRecentBookingsCard 
                                recentBookings={recentBookings} 
                            />
                        </>
                    ) : (
                        <>
                            <UpcomingBookingsCard 
                                upcomingBookings={upcomingBookings} 
                            />
                            <RecentBookingsCard 
                                recentBookings={recentBookings} 
                            />
                        </>
                    )}
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
                    userType={userType}
                />
            )}

            {/* Suggested Services */}
            <SuggestedServicesCard suggestedServices={suggestedServices} />
        </div>
    );
};

export default Dashboard;