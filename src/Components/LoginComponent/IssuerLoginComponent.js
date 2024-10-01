import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../../assets/blockchain-certificate-bg.png'; // Import the background image
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

const IssuerLoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`http://localhost:5000/api/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      navigate('/issuer');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and ensure MetaMask is connected.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          width: '400px',
          padding: '30px',
          border: '1px solid #ccc',
          borderRadius: '15px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Issuer Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '15px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                fontSize: '16px',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '15px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                  fontSize: '16px',
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <AiFillEyeInvisible size={20} color="#1877f2" /> : <AiFillEye size={20} color="#1877f2" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1877f2',
              color: '#ffffff',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#166fe5')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#1877f2')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default IssuerLoginComponent;
