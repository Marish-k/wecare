import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RescheduleAppointment({ appointment, onGoBack }) {
  const [formData, setFormData] = useState({
    appointmentDate: appointment.appointmentDate,
    slot: appointment.slot,
  });
  const [errors, setErrors] = useState({});
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Date is required';
      isValid = false;
    } else {
      const selectedDate = new Date(formData.appointmentDate);
      const today = new Date();
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(today.getDate() + 7);

      if (selectedDate < today || selectedDate > sevenDaysLater) {
        newErrors.appointmentDate = 'Date should be within the next 7 days';
        isValid = false;
      }
    }

    if (!formData.slot) {
      newErrors.slot = 'Slot is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.patch(
          `/bookings/${appointment.id}`,
          formData
        );
        console.log('Reschedule successful:', response.data);
        setRescheduleSuccess(true);
      } catch (error) {
        console.error('Reschedule failed:', error);
        setErrors({ general: 'Reschedule failed. Please try again.' });
      }
    }
  };

  const handleGoBackToList = () => {
    navigate('/userhome');
  };

  if (rescheduleSuccess) {
    return (
      <div>
        <h2>Appointment Rescheduled!</h2>
        <p>Your appointment has been successfully rescheduled.</p>
        <button onClick={handleGoBackToList}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Reschedule Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date of Appointment:</label>
          <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} />
          {errors.appointmentDate && <p className="error-message">{errors.appointmentDate}</p>}
        </div>
        <div>
          <label>Slot:</label>
          <input type="text" name="slot" value={formData.slot} onChange={handleChange} />
          {errors.slot && <p className="error-message">{errors.slot}</p>}
        </div>
        {errors.general && <p className="error-message">{errors.general}</p>}
        <button type="submit" disabled={!validateForm()}>
          Confirm Reschedule
        </button>
        <button onClick={onGoBack}>Go Back</button>
      </form>
    </div>
  );
}

export default RescheduleAppointment;