// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileCard from '../components/dashboardCard/ProfileCard';
import UpcomingActivitiesCard from '../components/dashboardCard/UpcomingActivitiesCard';
import RecentActivitiesCard from '../components/dashboardCard/RecentActivitiesCard'; 
import SuggestedServicesCard from '../components/dashboardCard/SuggestedServicesCard';
import UpcomingBookingsCard from '../components/dashboardCard/UpcomingBookingsCard'; 
import RecentBookingsCard from '../components/dashboardCard/RecentBookingsCard'; 
import CreateService from './CreateService'; 
import '../styles/dashboard.css'; 

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [upcomingBookings, setUpcomingBookings] = useState([]); 
    const [suggestedServices, setSuggestedServices] = useState([]); 
    const userType = localStorage.getItem('userType'); 

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token'); 

            try {
                // Fetch user profile
                const userProfile = await axios.get('http://localhost:5001/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(userProfile.data); 

                // Fetch suggested services
                const servicesResponse = await axios.get('http://localhost:5001/api/services', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const shuffledServices = servicesResponse.data.sort(() => 0.5 - Math.random()).slice(0, 3);
                setSuggestedServices(shuffledServices); 

                // Fetch upcoming bookings
                const upcomingResponse = await axios.get('http://localhost:5001/api/appointments/upcoming', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUpcomingBookings(upcomingResponse.data); 
            } catch (error) {
                console.error('Error fetching data:', error); 
            }
        };

        fetchData(); 
    }, [userType]);

    return (
        <div className="dashboard-container">
            <h1>Welcome to Your Dashboard!</h1>

            {/* Profile Card */}
            <ProfileCard userData={userData} />

            {userType === 'Client' && (
                <>
                    <UpcomingActivitiesCard userType={userType} />
                    <RecentActivitiesCard userType={userType} />
                    <SuggestedServicesCard suggestedServices={suggestedServices} />
                </>
            )}

            {userType === 'Provider' && (
                <>
                    <UpcomingBookingsCard upcomingBookings={upcomingBookings} />
                    <RecentBookingsCard userType={userType} />
                    <CreateService 
                        onServiceCreated={(newService) => {
                            setSuggestedServices(prevServices => {
                                if (!prevServices.find(service => service._id === newService._id)) {
                                    return [...prevServices, newService];
                                }
                                return prevServices; 
                            });
                        }} 
                        userType={userType} // Ensure userType is passed here
                    />
                </>
            )}
        </div>
    );
};

export default Dashboard;