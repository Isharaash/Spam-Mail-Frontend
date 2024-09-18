import React, { useState } from 'react';
import PredictionList from './PredictionList';
import './styles.css'; // Import CSS file

const Prediction = () => {
  const [email, setText] = useState('');
  const [predictionResult, setPredictionResult] = useState('');
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0); // Key to force refresh PredictionList

  const handlePrediction = async () => {
    try {
      if (email.trim() === '') {
        alert('Please enter text for content.');
        return; // Stop further execution
      }
  
      const response = await fetchPrediction(email);
      const data = await response.json();
      if (response.ok) {
        setPredictionResult(data.prediction);

        setRefreshKey(prevKey => prevKey + 1);
      } else {
        handlePredictionError(response, data);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  const fetchPrediction = async (email) => {
    return fetch('http://localhost:5000/api/detect-spam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      credentials: 'include', 
    });
  };

  const handlePredictionError = (response, data) => {
    if (response.status === 401) {
      setError('Unauthorized access');
    } else {
      setError(data.error || 'An error occurred');
    }
  };

  return (
    <div className="prediction-container">
      <h2 className="prediction-heading">Mail Content :</h2>
      {error && <p className="error-message">{error}</p>}
      <textarea
        id="contentTextarea"
        className="prediction-textarea"
        value={email}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for content ..."
        rows={4}
        cols={50}
        required
      />
      <button className="prediction-button" onClick={handlePrediction}>Predict</button>
      {predictionResult && (
        <div>
          <h3>Prediction Result:</h3>
          <p>{predictionResult}</p>
        </div>
      )}
      <PredictionList key={refreshKey} /> {}
    </div>
  );
};

export default Prediction;
