import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbars from './navbars';
import CoachSchedules from './CoachSchedules';
import CoachProfile from './CoachProfile';

function CoachHome() {
  const [bookings, setBookings] = useState([]);
  const [coach, setCoach] = useState(null);
  const [activeTab, setActiveTab] = useState('schedules');
  const coachId = localStorage.getItem("coachId")||1;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsResponse = await axios.get('/bookings');
        // eslint-disable-next-line eqeqeq
        setBookings(bookingsResponse.data.filter((booking) => booking.coachId == coachId));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchCoach = async () => {
      try {
        const coachResponse = await axios.get(`/coaches/${coachId}`);
        setCoach(coachResponse.data);
      } catch (error) {
        console.error('Error fetching coach:', error);
      }
    };

    fetchBookings();
    fetchCoach();
  }, [coachId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbars coachHome={true} onTabChange={handleTabChange} />
      {activeTab === 'schedules' && <CoachSchedules bookings={bookings} />}
      {activeTab === 'profile' && <CoachProfile coach={coach} />}
    </div>
  );
}

export default CoachHome;