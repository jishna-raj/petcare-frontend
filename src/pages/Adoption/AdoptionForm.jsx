import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { serverUrl } from '../../services/serverUrl';
import { getAadoptionUseridApi, addAdoptionRequestApi } from '../../services/allApi';

function AdoptionForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pet } = location.state || {};
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    adoptionReason: '',
    previousExperience: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionUser = sessionStorage.getItem('adoptionUser');
        if (sessionUser) {
          const parsedUser = JSON.parse(sessionUser);
          const userResponse = await getAadoptionUseridApi(parsedUser._id);
          console.log(userResponse);
          
          if (userResponse.status >= 200 && userResponse.status < 300) {
            setUserDetails(userResponse.data);
          }
        }
      } catch (err) {
        setError('Failed to load user details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!formData.adoptionReason.trim()) {
      setError('Please provide a reason for adoption');
      setSubmitting(false);
      return;
    }

    try {
      const requestBody = {
        petId: pet._id,
        userId:userDetails._id,
        adoptionReason: formData.adoptionReason.trim(),
        previousExperience: formData.previousExperience.trim()
      };

      const response = await addAdoptionRequestApi(requestBody);
      
      if (response.data && response.data.success) {
        alert('Adoption request submitted successfully!');
        navigate('/service');
      } else {
        setError(response.data?.message || 'Failed to submit request');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  
  if (!pet || !userDetails) {
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
      <h2 className="mb-4 text-center">Adoption Request for {pet.name}</h2>
      
      <div className="row">
        {/* Pet Details */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h4>Pet Information</h4>
            </div>
            <div className="card-body">
              <div className="pet-image-container">
                <img 
                  src={`${serverUrl}/uploads/${pet.petimg}`} 
                  alt={pet.name} 
                  className="img-fluid rounded mb-3"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = `${serverUrl}/uploads/default-pet.jpg`;
                  }}
                />
              </div>
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

        {/* User Details and Form */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h4>Your Information</h4>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Name:</strong> {userDetails.username}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {userDetails.email}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {userDetails.mobile || 'Not provided'}
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h4>Adoption Request Details</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Why do you want to adopt {pet.name}?
                  </label>
                  <textarea 
                    className="form-control"
                    rows="4"
                    required
                    value={formData.adoptionReason}
                    onChange={(e) => setFormData({
                      ...formData,
                      adoptionReason: e.target.value
                    })}
                    disabled={submitting}
                    placeholder="Please explain why you want to adopt this pet..."
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">
                    Your previous experience with pets
                  </label>
                  <textarea 
                    className="form-control"
                    rows="4"
                    value={formData.previousExperience}
                    onChange={(e) => setFormData({
                      ...formData,
                      previousExperience: e.target.value
                    })}
                    disabled={submitting}
                    placeholder="Describe any previous experience with pets (optional)"
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-success btn-lg"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span 
                          className="spinner-border spinner-border-sm" 
                          role="status" 
                          aria-hidden="true"
                        ></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Adoption Request'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdoptionForm;