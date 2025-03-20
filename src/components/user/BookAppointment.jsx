import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookAppointment({ coach, onGoBack }) {
  const [formData, setFormData] = useState({
    appointmentDate: '',
    slot: '',
  });
  const [errors, setErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || 1;

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

    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await axios.post('/bookings', {
          ...formData,
          userId: userId,
          coachId: coach.id,
        });
        console.log('Booking successful:', response.data);
        setBookingSuccess(true);
      } catch (error) {
        console.error('Booking failed:', error);
        setErrors({ general: 'Booking failed. Please try again.' });
      }
    }
  };

  const handleGoBackToList = () => {
    navigate('/userHome');
  };

  if (bookingSuccess) {
    return (
      <div>
        <h2>Appointment Booked!</h2>
        <p>Your appointment has been successfully booked.</p>
        <button onClick={handleGoBackToList}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Book Appointment with {coach.name}</h2>
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
          Confirm Your Appointment
        </button>
        <button onClick={onGoBack}>Go Back</button>
      </form>
    </div>
  );
}

export default BookAppointment;