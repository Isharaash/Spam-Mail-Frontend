import React, { useState, useEffect } from 'react';
import $ from 'jquery'; 
import './styles.css'; 
function PredictionList() {
  const [predictions, setPredictions] = useState([]);
  
  useEffect(() => {
    
    fetchPredictions();
  }, []);

  const fetchPredictions = () => {
    $.ajax({
      url: 'http://localhost:5000/api/view-post',
      method: 'GET',
      xhrFields: {
        withCredentials: true 
      },
      success: (data) => {
        setPredictions(data.predictions);
      },
      error: (error) => {
        console.error('Error fetching predictions:', error);
      }
    });
  };

  const handleDeletePrediction = (predictionId) => {
    $.ajax({
      url: `http://localhost:5000/api/delete-prediction/${predictionId}`,
      method: 'DELETE',
      xhrFields: {
        withCredentials: true 
      },
      success: () => {
        
        fetchPredictions();
        
        alert('Content deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting prediction:', error);
      }
    });
  };
  
  
  return (
    <div className="prediction-list-container">
      <h2>Mails History</h2>
      <ul className="prediction-list">
        {predictions.map(prediction => (
          <li key={prediction.id} className="prediction-item">
           <div><span className="label">E-mail:</span> <span className="value">{prediction.text}</span></div><br/>
           <div><span className="label">Prediction:</span> <span className="value2">{prediction.prediction}</span></div><br/>
            <button onClick={() => handleDeletePrediction(prediction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PredictionList;
