import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdReg.css';
import Swal from 'sweetalert2'
import { adoptionregisterApi } from '../../services/allApi';

function AdReg() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      Swal.fire({
        title:'Oops',
        text:'all fields are required',
        icon:'info'
      })
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      Swal.fire({
        title:'Oops',
        text:'invalid email format',
        icon:'error'
      })
    }

    try {
      setLoading(true);
      const response = await adoptionregisterApi(formData);
      console.log(response);
      
      
      if (response.status==200) {
           Swal.fire({
             title:'wow',
             text:'Registration successfully',
             icon:'success'
           })
           navigate('/adlogin')
          } else {
           Swal.fire({
             title:'Oops',
             text:'something went wrong',
             icon:'error'
           })
           setUser({
             username:"",
             email:"",
             password:""
           })
     
          }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ad-reg">
      <section className="registration-section mb-5 mt-5">
        <div className="registration-form">
          <h2>Create an Account</h2>
          <p>Join us to find your perfect furry friend!</p>
          
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password (min 6 characters)"
                minLength="6"
                required
              />
            </div>
            
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="login-link">
            <p>Already have an account? <a href="/adlogin">Log in here</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdReg;