import React, { useState, useEffect } from 'react';
import { getRequestsByUserApi } from '../../services/allApi';
import Swal from 'sweetalert2';

function AdoptionUserDetails() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        // Get user from session storage
        const sessionUser = sessionStorage.getItem('adoptionUser');
        console.log(sessionUser);
        
        if (!sessionUser) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        // Parse user data
        const userData = JSON.parse(sessionUser);
        const userId = userData?._id;

        if (!userId) {
          setError('Invalid user data in session');
          setLoading(false);
          return;
        }

        // Fetch requests using ID from session
        const response = await getRequestsByUserApi(userId);
        console.log(response.data.data.requests);
        
        if (response.data.status === 'success') {
          setRequests(response.data.data.requests);
        } else {
          setError('Failed to fetch adoption requests');
        }
      } catch (err) {
        console.error('Error:', err);
        Swal.fire('Error!', 'Failed to load adoption history', 'error');
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptionRequests();
  }, []); // Empty dependency array to run only once on mount

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-warning text-dark',
      approved: 'bg-success',
      rejected: 'bg-danger'
    };
    return <span className={`badge ${statusStyles[status]}`}>{status}</span>;
  };

  if (loading) return <div className="text-center"><div className="spinner-border text-primary"></div></div>;
  
  if (error) return (
    <div className="col-md-8 bg-white shadow-sm rounded p-4">
      <div className="alert alert-danger">{error}</div>
    </div>
  );

  return (
    <div className="col-md-8 bg-white shadow-sm rounded p-4">
      <h3 className="text-center fw-bold mb-4">Adoption Requests History</h3>

      {requests.length === 0 ? (
        <div className="alert alert-info">No adoption requests found</div>
      ) : (
        requests.map((request) => (
          <div key={request._id} className="border-top border-bottom py-3 mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="fw-bold">Request #{requests.indexOf(request) + 1}</div>
              <div>{getStatusBadge(request.status)}</div>
            </div>
            
            <div className="row">
              <div className="col-md-4">
                <p><strong>Pet Name:</strong> {request.pet?.name || 'N/A'}</p>
                <p><strong>Breed:</strong> {request.pet?.breed || 'N/A'}</p>
              </div>
              <div className="col-md-3"></div>
              <div className="col-md-4">
                <p><strong>Request Date:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> {new Date(request.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdoptionUserDetails;