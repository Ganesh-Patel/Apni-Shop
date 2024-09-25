import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Components/Pages/Home/Home.jsx'
import Login from './Components/Auth/Login.jsx';
import SignUp from './Components/Auth/Signup.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Header from './Components/Header/Header.jsx';
import { UserContext } from './Components/../Contexts/UserContext';
import ProtectedRoute from './Components/Routes/ProtectedRoute.jsx'; 
import ForgetPassword from './Components/Auth/ForgetPassword.jsx';
import VerifyEmail from './Components/Auth/VerifyEmail.jsx';

function App() {
  const { isLoggedIn } = useContext(UserContext);
  const location = useLocation(); 
  // Pages that should NOT have the Header and Footer
  const noHeaderFooterRoutes = ['/login', '/signup', '/forgotpassword','/verifyemail','/VerifyEmail'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Header and Footer if the route is not in noHeaderFooterRoutes */}
      {!noHeaderFooterRoutes.includes(location.pathname) && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgetPassword />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />

          {/* Protected Routes - only accessible if logged in */}
          
        </Routes>
      </div>

      {/* Conditionally render Footer */}
      {!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}
export default App;
