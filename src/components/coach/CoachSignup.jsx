import React, { useState } from 'react';
import axios from 'axios';
import CoachLogin from './CoachLogin';
import Navbars from './navbars';

function CoachSignup() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    speciality: '',
  });

  const [errors, setErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.name.length < 3 || formData.name.length > 50) {
      newErrors.name = 'Name should have 3 to 50 characters';
      isValid = false;
    }

    if (formData.password.length < 5 || formData.password.length > 10) {
      newErrors.password = 'Password should have 5 to 10 characters';
      isValid = false;
    }

    const birthYear = new Date(formData.dateOfBirth).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age < 20 || age > 100) {
      newErrors.dateOfBirth = 'Age should be between 20 and 100 years';
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }

    if (formData.mobileNumber.length !== 10 || !/^\d+$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile Number should have 10 digits';
      isValid = false;
    }

    if (formData.speciality.length < 10 || formData.speciality.length > 50) {
      newErrors.speciality = 'Speciality should have 10 to 50 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('/coaches', formData);
        console.log('Signup successful:', response.data);
        setSignupSuccess(true);
      } catch (error) {
        console.error('Signup failed:', error);
        setErrors({ general: 'Signup failed. Please try again.' });
      }
    }
  };

  const handleLoginNow = () => {
    setShowLogin(true);
  };

  if (showLogin) {
    return <CoachLogin />; 
  }

  if (signupSuccess) {
    return (
      <div className="success-card">
        <h2>Signup Successful!</h2>
        <p>You have successfully registered as a coach.</p>
        <button onClick={handleLoginNow}>Login Now</button>
      </div>
    );
  }

  return (
    <>
    <Navbars/>
    <div className="gap">
        
      </div>
    <div className="signup-wrapper">
      <div className="signup-card"> 
        <div className='title'>
      <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-person-check-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"
              />
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
        <h2> Life Coach Profile </h2></div>
        <form onSubmit={handleSubmit} className="signup-form">
        <div className="div-input">
          <div>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name' />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div>
            <label>Date of Birth:</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
          </div>
          <div>
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
            {errors.gender && <p className="error-message">{errors.gender}</p>}
          </div>
          <div>
            <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder='Mobile No' />
            {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}
          </div>
          <div>
            <input type="text" name="speciality" value={formData.speciality} onChange={handleChange} placeholder='Specialty' />
            {errors.speciality && <p className="error-message">{errors.speciality}</p>}
          </div>
          {errors.general && <p className="error-message">{errors.general}</p>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default CoachSignup;