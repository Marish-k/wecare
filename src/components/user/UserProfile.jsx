import React from "react";

function UserProfile({ user }) {
  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="coaches-container">
      <h2>View Profile</h2>
      <div className="profile-container">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>DOB : {user.dateOfBirth}</p>
        <p>mobileNumber : {user.mobileNumber}</p>
      </div>
    </div>
  );
}

export default UserProfile;
