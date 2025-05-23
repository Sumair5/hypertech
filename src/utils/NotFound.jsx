// src/pages/NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '3rem', color: '#FF5733' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.5rem', color: '#555' }}>
        Oops! The page you are looking for does not exist.
      </p>
      <button 
        style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}
        onClick={() => navigate('/')} // Go to home page
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
