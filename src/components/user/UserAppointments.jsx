import React, { useState } from 'react';
import RescheduleAppointment from './RescheduleAppointment';
import CancelAppointmentModal from './CancelAppointmentModal';


function UserAppointments({ bookings }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowReschedule(true);
  };

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setShowCancelModal(false);
  };

  const handleAppointmentDeleted = () => {
    setSelectedAppointment(null);
  };

  if (showReschedule && selectedAppointment) {
    return (
      <RescheduleAppointment
        appointment={selectedAppointment}
        onGoBack={() => setShowReschedule(false)}
      />
    );
  }

  if (showCancelModal && selectedAppointment) {
    return (
      <CancelAppointmentModal
        appointment={selectedAppointment}
        onClose={handleCloseModal}
        onAppointmentDeleted={handleAppointmentDeleted}
      />
    );
  }

  if (!bookings || bookings.length === 0) {

    return (
      <>
      <div className="coaches-container">
      <div style={{marginTop:'25px',textAlign:'center'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-clipboard2-x-fill" viewBox="0 0 16 16">
      <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
      <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 1 1 .708-.708z"/>
    </svg>
    <p>No appointments found.</p>
    </div>
    </div>
    </>
    );
  }

  return (
    <div className="coaches-container">

    <div className="appointments-container">
      <h2>My Appointments</h2>
      <div className="appointments-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="appointment-card">
            <p>Date: {booking.appointmentDate}</p>
            <p>Slot: {booking.slot}</p>
            <p>Coach ID: {booking.coachId}</p>
            <div className='card-buttons'>
              <button onClick={() => handleReschedule(booking)}>Reschedule Appointment</button>
              <button onClick={() => handleCancel(booking)}>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default UserAppointments;