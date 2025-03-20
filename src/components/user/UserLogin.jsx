import React, { useState } from "react";
import axios from "axios";
import UserHome from "./UserHome";
import { useNavigate } from "react-router-dom";
import Navbars from "./navbars";
function UserLogin() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
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
      newErrors.id = "ID is required";
      isValid = false;
    }

    if (formData.password.length < 5 || formData.password.length > 10) {
      newErrors.password = "Password should have 5 to 10 characters";
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
          `/users?id=${formData.id}&password=${formData.password}`
        );

        if (response.data.length > 0) {
          console.log("Login successful:", response.data[0]);
          localStorage.setItem("userId", response.data[0].id);
          setLoginSuccess(true);
          setShowHome(true);
          navigate("/userHome");
        } else {
          setErrors({ general: "User not registered" });
        }
      } catch (error) {
        console.error("Login failed:", error);
        setErrors({ general: "Login failed. Please try again." });
      }
    }
  };

  if (showHome) {
    return <UserHome />; 
  }

  return (
    <>
      <Navbars />
      <div className="gap">
        
      </div>
      <div className="login-card">
        <div className='title'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <h2> Login as user</h2>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {" "}
          <div>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="User Id"
            />
            {errors.id && <p className="error-message">{errors.id}</p>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          {errors.general && <p className="error-message">{errors.general}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default UserLogin;
