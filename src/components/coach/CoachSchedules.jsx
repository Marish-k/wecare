import React from 'react';

function CoachSchedules({ bookings }) {
  if (!bookings || bookings.length === 0) {
    return (
      <>
      <div className='coaches-container' style={{marginTop:'25px',textAlign:'center'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-clipboard2-x-fill" viewBox="0 0 16 16">
  <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
  <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 1 1 .708-.708z"/>
</svg>
    <p>No Planned Schedules yet.</p>
    </div>
    </>
  );
  }

  return (
    <div className="schedules-container">
      <h2>My Schedules</h2>
      <div className="schedules-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="schedule-card">
            <p>Date: {booking.appointmentDate}</p>
            <p>Slot: {booking.slot}</p>
            <p>User ID: {booking.userId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoachSchedules;