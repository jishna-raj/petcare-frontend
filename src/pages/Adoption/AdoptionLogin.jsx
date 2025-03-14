import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdoptionLogin.css';
import Swal from 'sweetalert2'
import { adoptionloginApi } from '../../services/allApi';

function AdoptionLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!credentials.email || !credentials.password) {
      setLoading(false);
      Swal.fire({
        title: 'Oops',
        text: 'all fields are required',
        icon: 'info'
      })
    }

    try {
      const response = await adoptionloginApi(credentials);
      console.log(response);
      

      if (response.status === 200) {

        Swal.fire({
          title: 'wow',
          text: 'Login successfully',
          icon: 'success'
        })

        sessionStorage.setItem("adoptionUser", JSON.stringify(response.data.existingUser))
        sessionStorage.setItem("adoptionToken", response.data.token)


        navigate('/service');


      } else {
        Swal.fire({
          title: 'Oops',
          text: 'something went wrong',
          icon: 'error'
        })
        setCredentials({
          email: "",
          password: ""
        })
      }

    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Hero Section */}
      <div className="login-hero">
        <div className="hero-overlay">
          <h1>Welcome Back!</h1>
          <p>Continue your journey to find the perfect companion</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>

          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="signup-link">
            Don't have an account? <a href="/adreg">Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdoptionLogin;