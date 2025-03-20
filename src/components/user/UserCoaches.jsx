import React, { useState } from 'react';
import BookAppointment from './BookAppointment';

function UserCoaches({ coaches }) {
  const [selectedCoach, setSelectedCoach] = useState(null);

  const handleBookAppointment = (coach) => {
    setSelectedCoach(coach);
  };

  const handleGoBack = () => {
    setSelectedCoach(null);
  };

  if (selectedCoach) {
    return <BookAppointment coach={selectedCoach} onGoBack={handleGoBack} />;
  }

  return (
    <div className="coaches-container">
      <h2>Available Coaches</h2>
      <div className="coaches-list">
        {coaches.map((coach) => (
          <div key={coach.id} className="coach-card">
            <h3>{coach.name}</h3>
            <h5>Coach Id : {coach.id}</h5>
            <p>Mobile No : {coach.mobileNumber}</p>
            <p>Speciality: {coach.speciality}</p>
            <button onClick={() => handleBookAppointment(coach)}>Book Appointment</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCoaches;