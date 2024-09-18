import React from 'react';
import Prediction from './Prediction';
import { useLocation } from 'react-router-dom';
import Logout from './Logout';
import './styles.css'; 

const UserPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');

  return (
    <div className="user-page">
    
      <div className="header">
    
        <h2>Welcome, {firstName} {lastName}!</h2>
        <Logout className="logout-button" />
      </div>
      <Prediction />
    </div>
  );
};

export default UserPage;
