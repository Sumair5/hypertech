// src/components/ErrorBoundary.js
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    this.setState({ errorInfo });
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.errorInfo} />; // Display ErrorPage component when error occurs
    }

    return this.props.children; // Render children components if no error
  }
}

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();
  
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '3rem', color: 'red' }}>Something Went Wrong!</h1>
      <p style={{ fontSize: '1.5rem', color: '#555' }}>
        {error ? 'Error: ' + error.componentStack : 'An unexpected error occurred.'}
      </p>
      <button 
        style={{ padding: '10px 20px', backgroundColor: '#FF5733', color: '#fff', border: 'none', borderRadius: '5px' }}
        onClick={() => navigate('/')} // Go to home page
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorBoundary;
