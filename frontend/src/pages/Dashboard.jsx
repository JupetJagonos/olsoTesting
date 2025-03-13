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
    const [recentBookings, setRecentBookings] = useState([]); 
    const [suggestedServices, setSuggestedServices] = useState([]); 
    const [upcomingActivities, setUpcomingActivities] = useState([]); 
    const [recentActivities, setRecentActivities] = useState([]); 
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

                // Fetch recent bookings
                const recentResponse = await axios.get('http://localhost:5001/api/appointments/recent', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRecentBookings(recentResponse.data);

                // Fetch upcoming activities
                const upcomingActivitiesResponse = await axios.get('http://localhost:5001/api/activities/upcoming', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUpcomingActivities(upcomingActivitiesResponse.data);

                // Fetch recent activities
                const recentActivitiesResponse = await axios.get('http://localhost:5001/api/activities/recent', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRecentActivities(recentActivitiesResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error); 
            }
        };

        fetchData(); 
    }, [userType]);

    return (
        <div className="dashboard-container">
            <h1>{userType === 'Client' ? 'Client Dashboard' : 'Provider Dashboard'}</h1>

            {/* Profile Card */}
            <div className="profile-card card">
                <ProfileCard userData={userData} />
            </div>
            <div className='Services'>
    <div className="activities-bookings-section">
        <h2>Bookings</h2>
        <div className="bookings-row">
            <div className="booking-container">
                <UpcomingBookingsCard upcomingBookings={upcomingBookings} />
            </div>
            <div className="booking-container">
                <RecentBookingsCard recentBookings={recentBookings} />
            </div>
        </div>

        <h2>Activities</h2>
        <div className="activities-row">
            <div className="activity-container">
                <UpcomingActivitiesCard activities={upcomingActivities} />
            </div>
            <div className="activity-container">
                <RecentActivitiesCard activities={recentActivities} userType={userType} />
            </div>
        </div>
    </div>
</div>

            {/* Create Service Section */}
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
            <SuggestedServicesCard suggestedServices={suggestedServices} />
        </div>
    );
};

export default Dashboard;