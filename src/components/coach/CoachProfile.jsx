import React from 'react';

function CoachProfile({ coach }) {
  if (!coach) {
    return (
    <>
    <div className="coaches-container">
    <p>Loading profile...</p>
    </div>
    </>
    );
  }

  return (
    <div className='coaches-container'>
      <h2>View Profile</h2>
      <div className="profile-container">
      <p>Name: {coach.name}</p>
      <p>DOB: {coach.dateOfBirth}</p>
      <p>Mobile: {coach.mobileNumber}</p>
      <p>Gender: {coach.gender === "M" ? "He" : (coach.Gender === "F" ? "She" : "Other")}</p>
      <p>Speciality: {coach.speciality}</p>
      </div>
    </div>
  );
}

export default CoachProfile;