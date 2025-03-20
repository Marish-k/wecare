import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CoachSignup from './components/coach/CoachSignup';
import CoachLogin from './components/coach/CoachLogin';
import UserSignup from './components/user/UserSignup';
import UserLogin from './components/user/UserLogin';
import CoachHome from './components/coach/CoachHome';
import UserHome from './components/user/UserHome';
import Footer from './components/Footer';
import UserAppointments from './components/user/UserAppointments'; // Import UserAppointments

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/weCare" element={<Home />} />
        <Route path="/coachSignup" element={<CoachSignup />} />
        <Route path="/coachLogin" element={<CoachLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/coachHome" element={<CoachHome />} />
        <Route path="/userHome" element={<UserHome />} />
        <Route path="/userAppointments" element={<UserAppointments />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;