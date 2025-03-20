import React, { useState } from "react";
import axios from "axios";
import UserLogin from "./UserLogin";
import Navbars from "./navbars";

function UserSignup() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
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
      newErrors.name = "Name should have 3 to 50 characters";
      isValid = false;
    }

    if (formData.password.length < 5 || formData.password.length > 10) {
      newErrors.password = "Password should have 5 to 10 characters";
      isValid = false;
    }

    if (
      formData.mobileNumber.length !== 10 ||
      !/^\d+$/.test(formData.mobileNumber)
    ) {
      newErrors.mobileNumber = "Mobile Number should have 10 digits";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    const birthYear = new Date(formData.dateOfBirth).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age < 20 || age > 100) {
      newErrors.dateOfBirth = "Age should be between 20 and 100 years";
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    if (formData.pincode.length !== 6 || !/^\d+$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode should have 6 digits";
      isValid = false;
    }

    if (formData.city.length < 6 || formData.city.length > 20) {
      newErrors.city = "City should have 6 to 20 characters";
      isValid = false;
    }

    if (formData.state.length < 6 || formData.state.length > 20) {
      newErrors.state = "State should have 6 to 20 characters";
      isValid = false;
    }

    if (formData.country.length < 6 || formData.country.length > 20) {
      newErrors.country = "Country should have 6 to 20 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("/users", formData);
        console.log("Signup successful:", response.data);
        setSignupSuccess(true);
      } catch (error) {
        console.error("Signup failed:", error);
        setErrors({ general: "Signup failed. Please try again." });
      }
    }
  };

  const handleLoginNow = () => {
    setShowLogin(true);
  };

  if (showLogin) {
    return <UserLogin />;
  }

  if (signupSuccess) {
    return (
      <div className="success-card">
        <h2>Signup Successful!</h2>
        <p>You have successfully registered as a user.</p>
        <button onClick={handleLoginNow}>Login Now</button>
      </div>
    );
  }

  return (
    <>
      <Navbars />
      <div className="gap"></div>
      <div className="signup-wrapper">
        <div className="signup-card">
          <div className="title">
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
            <h2>User Profile</h2>
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="div-input">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
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
              <div>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Mobile No"
                />
                {errors.mobileNumber && (
                  <p className="error-message">{errors.mobileNumber}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                {errors.dateOfBirth && (
                  <p className="error-message">{errors.dateOfBirth}</p>
                )}
              </div>
              <div>
                <label>Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
                {errors.gender && (
                  <p className="error-message">{errors.gender}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                />
                {errors.pincode && (
                  <p className="error-message">{errors.pincode}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
                {errors.city && <p className="error-message">{errors.city}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                />
                {errors.state && (
                  <p className="error-message">{errors.state}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
                {errors.country && (
                  <p className="error-message">{errors.country}</p>
                )}
              </div>
            </div>
            {errors.general && (
              <p className="error-message">{errors.general}</p>
            )}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserSignup;
