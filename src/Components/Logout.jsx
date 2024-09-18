import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; 
import './styles.css'; 

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) {
      return; 
    }

    try {
      
      await fetch('http://localhost:5000/api/login', { method: 'POST' });
      
      navigate('/');
     
    } catch (error) {
      console.error('Logout failed:', error);
     
    }
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        <FiLogOut className="icon" /> {}
        Logout
      </button>
      {}
    </div>
  );
};

export default LogoutPage;
