import axios from 'axios';
import React, { useState } from 'react';
import { AppRoutes } from '../constants/constant';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
const navigate = useNavigate()
  const handleSubmit = async (e) => {
  try{
      e.preventDefault();
    setIsLoading(true);
    const res = await axios.post(AppRoutes.verify,{ verificationCode: code})
    console.log("res from verify page=> ", res.data)
    setError('');
    navigate("/login")
    
  }catch(error){
    console.log("erorr from catch in from verify page", error.message)
  }
  };

  const handleResend = () => {
    // Simulate resend logic
    alert('Verification code resent to your email.');
  };

  return (
    <div style={{
      backgroundColor: '#F5F5F5', // Off-White background
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#D0F0C0', // Light Green card
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        maxWidth: '450px',
        width: '100%',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Icon or Logo */}
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#A8E6CF', // Primary Mint
          borderRadius: '50%',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: '#2E7D32' // Forest Green
        }}>
          ✉️
        </div>
        
        <h1 style={{
          color: '#2E7D32', // Forest Green header
          marginBottom: '10px',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          Verify Your Email
        </h1>
        
        <p style={{
          color: '#333333', // Dark Gray text
          marginBottom: '30px',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          We've sent a 6-digit verification code to your email. Enter it below to continue.
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength="6"
            style={{
              width: '100%',
              padding: '15px',
              border: '2px solid #A8E6CF', // Primary Mint border
              borderRadius: '8px',
              fontSize: '18px',
              marginBottom: '20px',
              backgroundColor: '#F5F5F5', // Off-White input
              color: '#333333', // Dark Gray text
              textAlign: 'center',
              letterSpacing: '2px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#2E7D32'} // Forest Green on focus
            onBlur={(e) => e.target.style.borderColor = '#A8E6CF'}
            required
          />
          
          {error && (
            <p style={{
              color: '#d32f2f', // Red for error
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </p>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: isLoading ? '#cccccc' : '#A8E6CF', // Primary Mint or disabled gray
              color: '#333333', // Dark Gray text
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s, transform 0.2s',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#2E7D32'; // Forest Green on hover
                e.target.style.transform = 'scale(1.02)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#A8E6CF';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
        
        <p style={{
          color: '#333333',
          fontSize: '14px'
        }}>
          Didn't receive the code?{' '}
          <button
            onClick={handleResend}
            style={{
              background: 'none',
              border: 'none',
              color: '#2E7D32', // Forest Green link
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px'
            }}
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default Verify;

