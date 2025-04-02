import { faAddressBook, faMapPin, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import Adeditprofile from './Adeditprofile';
import AdoptionUserDetails from './AdoptionUserDetails';
import { getadoptionuserdataApi, getRequestsByUserApi } from '../../services/allApi';
import { serverUrl } from '../../services/serverUrl';
import { editResponseContext } from '../../context/Contextshare';

function Adoptionprofile() {
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const { editResponse } = useContext(editResponseContext);

  // Fetch user data
  const getUserData = async () => {
    const token = sessionStorage.getItem('adoptionToken');
    const reqHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const result = await getadoptionuserdataApi(reqHeader);
    if (result.status === 200) {
      setUser(result.data);
    }
  };

  // Generate notification messages
  const getNotificationMessage = (request) => {
    const visitDate = new Date(request.updatedAt);
    visitDate.setDate(visitDate.getDate() + 3);
    
    return request.status === 'approved' 
      ? `Thank you for choosing us. Your adoption request has been approved, and we will reach out to you at your home on ${visitDate.toLocaleDateString()} . For further details, please contact us at 9856346789`
      : 'Unfortunately we rejected your request. Please contact us at 9856346789';
  };

  // Fetch and process adoption notifications
  const getAdoptionNotifications = async () => {
    try {
      const sessionUser = sessionStorage.getItem('adoptionUser');
      if (!sessionUser) return;
      
      const userData = JSON.parse(sessionUser);
      const userId = userData?._id;
      if (!userId) return;

      const response = await getRequestsByUserApi(userId);
      if (response.data.status === 'success') {
        const processedNotifications = response.data.data.requests
          .filter(request => ['approved', 'rejected'].includes(request.status))
          .map(request => ({
            id: request._id,
            date: new Date(request.updatedAt).toLocaleDateString(),
            status: request.status,
            message: getNotificationMessage(request) // Fixed this reference
          }));
        setNotifications(processedNotifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    getUserData();
    getAdoptionNotifications();
  }, [editResponse]);

  return (
    <>
      {/* Cover Image and Profile Picture */}
      <div className="border cover" style={{ height: '250px', position: 'relative' }}>
        <img
          src={user?.img ? `${serverUrl}/uploads/${user.img}` : 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png'}
          alt="Profile"
          className="circle-image"
        />
      </div>

      {/* User Details Section */}
      <div className="pt-2 border p-4">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h2 className="fw-bold text-black ms-4">{user.username}</h2>
            <small className="fw-bolder">
              <FontAwesomeIcon icon={faMessage} className="fa-sm me-3" />
              {user.email}
            </small><br />
            {user.mobile && (
              <small>
                <FontAwesomeIcon icon={faAddressBook} className="fa-sm me-3" />
                {user.mobile}
              </small>
            )} <br/>
            {user.place && (
              <small>
                <FontAwesomeIcon icon={faMapPin} className="fa-sm me-3" />
                {user.place}
              </small>
            )}
          </div>
          <div className="col-md-4">
            <Adeditprofile />
          </div>
        </div>
      </div>

      {/* Notifications and Adoption History Section */}
      <div className="container py-5">
        <div className="row w-100">
          {/* Adoption Notifications Section */}
          <div className="col-md-4 d-flex align-items-center justify-content-center border bg-light shadow p-3">
            <div>
              <h5 className="text-center fw-bold mb-4">Adoption Notifications</h5>
              <ol className="pl-3">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <li key={notification.id} className="mb-3 text-success">
                      {notification.message}
                      <br />
                      <strong>Status Updated: {notification.date}</strong>
                      {notification.status === 'rejected' && (
                        <><br /><strong>Contact:</strong> 9856346789</>
                      )}
                    </li>
                  ))
                ) : (
                  <p>No notifications yet</p>
                )}
              </ol>
            </div>
          </div>

          {/* Adoption History Section */}
          <AdoptionUserDetails />
        </div>
      </div>
    </>
  );
}

export default Adoptionprofile;