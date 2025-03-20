import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CancelAppointmentModal({ appointment, onClose, onAppointmentDeleted }) {
  const navigate = useNavigate();

  const handleCancelConfirm = async () => {
    try {
      await axios.delete(`/bookings/${appointment.id}`);
      console.log('Appointment canceled:', appointment.id);
      onAppointmentDeleted();
      navigate('/userHome');
    } catch (error) {
      console.error('Cancel appointment failed:', error);
    }
  };

  return (
    <div className="success-card">
      <div className="modal-content">
        <h2>Confirm Cancellation</h2>
        <p>Are you sure you want to cancel this appointment?</p>
        <button onClick={handleCancelConfirm}>Yes</button><br></br>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
}

export default CancelAppointmentModal;