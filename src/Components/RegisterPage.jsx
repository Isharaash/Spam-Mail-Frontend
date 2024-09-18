import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons
import './styles.css'; // Import the CSS file
import samplePhoto from './2.jpg'; // Import your sample photo
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '' // Added confirmPassword field
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; 
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        alert('Registration successful');
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Registration failed');
        alert('Registration failed. Please check your inputs and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  
  const handleLogin = () => {
    navigate('/'); 
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }

    return true;
  };

  return (
    <div className="register-container">
      <h1>Spam E-Mail Classifier</h1>
      <div className="register-form-container">
        <div className="register-form">
          <h2>SIGN-UP</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Registration successful</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label className={formData.firstName ? "positioned-label" : ""}>
                <FaUser /> {}
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label className={formData.lastName ? "positioned-label" : ""}>
                <FaUser /> {}
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label className={formData.email ? "positioned-label" : ""}>
                <FaEnvelope /> {}
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label className={formData.password ? "positioned-label" : ""}>
                <FaLock /> {}
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label className={formData.confirmPassword ? "positioned-label" : ""}>
                <FaLock /> {}
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Register</button>
            <p>Already registered? <span className="register-link" onClick={handleLogin}>Login here</span>.</p>
          </form>
        </div>
      </div>
      <div className="photo-container2">
        <img src={samplePhoto} alt="Sample" className="photo2" />
      </div>
    </div>
  );
};

export default RegisterPage;
