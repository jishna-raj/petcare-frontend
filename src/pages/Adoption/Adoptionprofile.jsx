import { faAddressBook, faMapPin, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import Adeditprofile from './Adeditprofile';
import AdoptionUserDetails from './AdoptionUserDetails';
import { getadoptionuserdataApi } from '../../services/allApi';
import { serverUrl } from '../../services/serverUrl';
import { editResponseContext } from '../../context/Contextshare';

function Adoptionprofile() {
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const { editResponse } = useContext(editResponseContext); // Context for edit response

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

  // Fetch adoption notifications (if applicable)
  const getAdoptionNotifications = async () => {
    const token = sessionStorage.getItem('adoptionToken');
    const reqHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    // Replace with your API call for adoption notifications
    // const result = await getAdoptionNotificationsApi(reqHeader);
    // if (result.status === 200) {
    //   setNotifications(result.data);
    // }
  };

  useEffect(() => {
    getUserData();
    getAdoptionNotifications();
  }, [editResponse]); // Re-fetch data when editResponse changes

  return (
    <>
      {/* Cover Image and Profile Picture */}
      <div className="border cover" style={{ height: '250px', position: 'relative' }} >
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
            </small>{' '}
            <br />
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
                  notifications.map((item, index) => (
                    <li key={index} className="mb-3">
                      Thank you for adopting a pet! <br />
                      <strong>Date:</strong> {item.date} <br />
                      <strong>Contact us:</strong> {item.contact}
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