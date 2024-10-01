import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReceiverLoginComponent = () => {
  const [uucmsId, setUucmsId] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleUucmsIdChange = (e) => setUucmsId(e.target.value.trim());
  const handleDobChange = (e) => setDob(e.target.value.trim());

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Input validation on frontend
    if (!uucmsId || !dob) {
      setError('UUCMS ID and Date of Birth are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/certificate/studentlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uucmsId: uucmsId.trim(),
          dob: dob, // Ensure dob is in 'YYYY-MM-DD' format
        }),
      });

      if (!response.ok) {
        // If the response is not ok (e.g., 400 or 500 status), handle the error.
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
      } else {
        // Attempt to parse the response
        const data = await response.json();

        if (data.certificate) {
          console.log('Login successful:', data);
          // Navigate to receiver page with certificate data
          navigate('/receiver', { state: { certificate: data.certificate } });
        } else {
          setError('No certificate data found.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div
        style={{
          width: '400px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '15px',
          boxShadow: '0px 0px 10px #ccc',
          backgroundColor: '#ffffff',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Receiver Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="UUCMS ID"
              value={uucmsId}
              onChange={handleUucmsIdChange}
              style={{
                width: 'calc(100% - 20px)',
                padding: '10px',
                borderRadius: '15px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={handleDobChange}
              style={{
                width: 'calc(100% - 20px)',
                padding: '10px',
                borderRadius: '15px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: 'calc(100% - 20px)',
              padding: '10px',
              backgroundColor: '#1877f2',
              color: '#ffffff',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ReceiverLoginComponent;
