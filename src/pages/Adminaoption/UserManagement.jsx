import React, { useEffect, useState } from 'react';
import { getalladoptionuserApi, getalluserApi } from '../../services/allApi';
import './UserManagement.css';
import { serverUrl } from '../../services/serverUrl';


function UserManagement() {
  const [adoptionUsers, setAdoptionUsers] = useState([]);
  const [groomingUsers, setGroomingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const adoptionResponse = await getalladoptionuserApi();
        const groomingResponse = await getalluserApi();

        console.log(adoptionResponse);
        console.log(groomingResponse);
        
        
        
        if (adoptionResponse.data?.success) setAdoptionUsers(adoptionResponse.data.users);
        if (groomingResponse.data?.success) setGroomingUsers(groomingResponse.data.user);

        
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const UserCard = ({ user, type }) => (
    <div className="user-card">
      <div className="user-image">
        <img 
          src={`${serverUrl}/uploads/${user?.img}`}
          alt={user.username}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150';
          }}
        />
      </div>
      <div className="user-details">
        <h3>{user.username}</h3>
        <p className="user-type">{type} User</p>
        <div className="user-info">
          <p><i className="fas fa-envelope"></i> {user.email}</p>
          {user.place && <p><i className="fas fa-map-marker-alt"></i> {user.place}</p>}
          {user.mobile && <p><i className="fas fa-phone"></i> {user.mobile}</p>}
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-management-container">
      <h1 className="management-header">User Management</h1>
      
      <div className="user-category">
        <h2>Adoption Users ({adoptionUsers.length})</h2>
        <div className="users-grid">
          {adoptionUsers.length > 0 ? (
            adoptionUsers.map(user => (
              <UserCard key={user._id} user={user} type="Adoption" />
            ))
          ) : (
            <p className="no-users">No adoption users found</p>
          )}
        </div>
      </div>

      <div className="user-category">
        <h2>Grooming Users ({groomingUsers.length})</h2>
        <div className="users-grid">
          {groomingUsers.length > 0 ? (
            groomingUsers.map(user => (
              <UserCard key={user._id} user={user} type="Grooming" />
            ))
          ) : (
            <p className="no-users">No grooming users found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;