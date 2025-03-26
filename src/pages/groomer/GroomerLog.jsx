import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GroomerLog.css';
import Swal from 'sweetalert2';
import { groomerloginApi } from '../../services/allApi';

function GroomerLog() {
  const [gr, setgr] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setgr({
      ...gr,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!gr.email || !gr.password) {
      setLoading(false);
      Swal.fire({
        title: 'Oops',
        text: 'All fields are required',
        icon: 'info'
      });
      return;
    }

    try {
      const response = await groomerloginApi(gr);
      console.log(response);

      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Login successful',
          icon: 'success'
        });

        sessionStorage.setItem("groomerDetails", JSON.stringify(response.data.existingGroomer));
        sessionStorage.setItem("groomerToken", response.data.token);

        navigate(`/groomer-dashboard/${response.data.existingGroomer._id}`);
      } else {
        Swal.fire({
          title: 'Oops',
          text: response.data?.message || 'Something went wrong',
          icon: 'error'
        });
        setgr({
          email: "",
          password: ""
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Login failed. Please try again.',
        icon: 'error'
      });
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='groom-cont'>
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6 p-5">
        <div className="login-container3 shadow-lg p-5">
          <div className="background-blur"></div>
          <form className="login-form3" onSubmit={handleSubmit}>
            <h2 className="form-title3">
              <span className="title-text1">Welcome Back</span>
              <span className="title-subtext">Groomer Login</span>
            </h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="input-group3">
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="form-input"
                placeholder=" "
                value={gr.email}
                onChange={handleInputChange}
              />
              <label htmlFor="email" className="input-label">Email Address</label>
              <div className="underline"></div>
            </div>

            <div className="input-group3">
              <input 
                type="password" 
                id="password" 
                name="password" 
                required
                minLength="6"
                className="form-input"
                placeholder=" "
                value={gr.password}
                onChange={handleInputChange}
              />
              <label htmlFor="password" className="input-label">Password</label>
              <div className="underline"></div>
            </div>

            <button type="submit" className="login-button1">
              <span className="button-text">Sign In</span>
              <div className="button-loader"></div>
            </button>

            <div className="form-footer">
              <span className="footer-text">Don't have an account? <Link style={{textDecoration:"none",color:"green",fontWeight:"600"}} to={'/groomer-reg'}>Sign Up</Link></span>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  </div>
  );
}

export default GroomerLog;