import React, { useState } from 'react';
import axios from 'axios';
import CoachHome from './CoachHome';
import { useNavigate } from 'react-router-dom';
import Navbars from './navbars';

function CoachLogin() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showHome, setShowHome] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.id) {
      newErrors.id = 'ID is required';
      isValid = false;
    }

    if (formData.password.length < 5 || formData.password.length > 10) {
      newErrors.password = 'Password should have 5 to 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.get(
          `/coaches?id=${formData.id}&password=${formData.password}`
        );

        if (response.data.length > 0) {
          console.log('Login successful:', response.data[0]);
          localStorage.setItem("coachId", response.data[0].id);
          setLoginSuccess(true);
          setShowHome(true);
          navigate('/coachhome')
        } else {
          setErrors({ general: 'Invalid ID or password' });
        }
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({ general: 'Login failed. Please try again.' });
      }
    }
  };

  if (showHome) {
    return <CoachHome />; // Render CoachHome component
  }

  return (
    <>
    <Navbars/>
    <div className="gap">
        
      </div>
    <div className="login-card">
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
            <h3>Login as Life Coach</h3></div>
      <form onSubmit={handleSubmit} className="login-form"> {/* Added className */}
        <div>
          <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder='Coach Id'/>
          {errors.id && <p className="error-message">{errors.id}</p>}
        </div>
        <div>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        {errors.general && <p className="error-message">{errors.general}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
}

export default CoachLogin;