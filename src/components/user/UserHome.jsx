import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbars from './navbars';
import UserCoaches from './UserCoaches';
import UserProfile from './UserProfile';
import UserAppointments from './UserAppointments';

function UserHome() {
  const [coaches, setCoaches] = useState([]);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('coaches'); 
  const userId = localStorage.getItem("userId") || 1;

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const coachesResponse = await axios.get('/coaches');
        setCoaches(coachesResponse.data);
      } catch (error) {
        console.error('Error fetching coaches:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(`/users/${userId}`);
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchBookings = async () => {
      try {
        const bookingsResponse = await axios.get('/bookings');
        // eslint-disable-next-line eqeqeq
        setBookings(bookingsResponse.data.filter((booking) => booking.userId == userId));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchCoaches();
    fetchUser();
    fetchBookings();
  }, [userId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbars userHome={true} onTabChange={handleTabChange} />
      {activeTab === 'coaches' && <UserCoaches coaches={coaches} />}
      {activeTab === 'profile' && <UserProfile user={user} />}
      {activeTab === 'appointments' && <UserAppointments bookings={bookings} />}
    </div>
  );
}

export default UserHome;