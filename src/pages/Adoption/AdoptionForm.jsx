// AdoptionRequest.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { serverUrl } from '../../services/serverUrl';


function AdoptionForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pet, user } = location.state || {};

  if (!pet || !user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Invalid request. Please select a pet first.
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/pets')}
        >
          Back to Pets
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Adoption Request for {pet.name}</h2>
      
      <div className="row">
        {/* Pet Details */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h4>Pet Information</h4>
            </div>
            <div className="card-body">
              <img 
                src={`${serverUrl}/uploads/${pet.petimg}`} 
                alt={pet.name} 
                className=" mb-3"
                height={'400px'}
                width={'100%'}
              />
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Name:</strong> {pet.name}
                </li>
                <li className="list-group-item">
                  <strong>Type:</strong> {pet.petType}
                </li>
                <li className="list-group-item">
                  <strong>Age:</strong> {pet.ageYears} years {pet.ageMonths} months
                </li>
                <li className="list-group-item">
                  <strong>Breed:</strong> {pet.breed}
                </li>
                <li className="list-group-item">
                  <strong>Location:</strong> {pet.location}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h4>Your Information</h4>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Name:</strong> {user.username}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {user.phone || 'Not provided'}
                </li>
              </ul>
            </div>
          </div>

          {/* Adoption Form */}
          <div className="card">
            <div className="card-header">
              <h4>Adoption Request Details</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">
                    Why do you want to adopt {pet.name}?
                  </label>
                  <textarea 
                    className="form-control" 
                    rows="3"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">
                    Your previous experience with pets
                  </label>
                  <textarea 
                    className="form-control" 
                    rows="3"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success">
                  Submit Adoption Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdoptionForm;