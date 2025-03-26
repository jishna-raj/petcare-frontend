import { faAddressBook, faBell, faMapPin, faMessage, faUser, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import Userdetails from '../component/Userdetails';
import Editprofile from '../component/Editprofile';
import { deletedMessageApi, getMessageApi, userdataApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';
import { editResponseContext, messageSentResponseContext } from '../context/Contextshare';
import Header from '../component/Header';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';


function Userprofile() {
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState([]);
  const { editResponse } = useContext(editResponseContext);
  const { messageSent } = useContext(messageSentResponseContext);

  const getUser = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    try {
      const result = await userdataApi(reqHeader);
      /* console.log(result); */

      setUser(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getMessage = async () => {
    const token = sessionStorage.getItem("token");

    const existingUserData = sessionStorage.getItem("existingUser");

    const existingUser = JSON.parse(existingUserData);

    const userId = existingUser._id;
    console.log("User ID:", userId);



    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    try {
      const result = await getMessageApi(userId, reqHeader);
      console.log(result);

      setMessage(result.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const handleDeleteMessage = async (messageId) => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };

      // Call your delete API
      const result = await deletedMessageApi(messageId, reqHeader);

      if (result.status === 200) {
        // Refresh the messages after deletion
        getMessage();
        // You might want to add a toast notification here
        alert('Message deleted successfully');
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      alert('Error deleting message');
    }
  };


  useEffect(() => {
    getUser();
    getMessage();
  }, [editResponse, messageSent]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />;
      case 'Cancelled':
        return <FontAwesomeIcon icon={faTimes} className="text-danger me-2" />;
      case 'Completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-primary me-2" />;
      default:
        return <FontAwesomeIcon icon={faBell} className="text-warning me-2" />;
    }
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MMMM D, YYYY');
  };

  const getNotificationMessage = (item) => {
    const details = item.details || {};
    switch (item.status) {
      case 'Confirmed':
        return `Your ${item.service} booking for ${details.petType || 'pet'} (${details.breed || 'no breed specified'}) 
                on ${item.date} at ${item.time} has been accepted by ${details.groomerName || 'the groomer'}. 
                Special instructions: ${details.instructions || 'none provided'}`;
      case 'Cancelled':
        return `Your ${item.service} booking on ${item.date} has been declined. 
                ${details.instructions ? `Reason: ${details.instructions}` : 'Please contact us for details'}`;
      case 'Completed':
        return `Service completed for ${item.service} on ${item.date}. Thank you for choosing ${details.groomerName ? details.groomerName : 'us'
          }!`;
      default:
        return `Update for ${item.service} booking on ${item.date}`;
    }
  };

  return (
    <>
      <Header />

      <div className="border cover" style={{ height: "250px", position: "relative" }}>
        <img
          src={user?.img ? `${serverUrl}/uploads/${user.img}` : "/default-profile.png"}
          alt="Profile"
          className="circle-image"
        />
      </div>

      <div className='pt-2 border p-4'>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h2 className='fw-bold text-black ms-4'>{user.username}</h2>
            <small className='fw-bolder'>
              <FontAwesomeIcon icon={faMessage} className='fa-sm me-3' />
              {user.email}
            </small> <br />
            {user.mobile && (
              <small>
                <FontAwesomeIcon icon={faAddressBook} className='fa-sm me-3' />
                {user.mobile}
              </small>
            )} <br />
            {user.place && (
              <small>
                <FontAwesomeIcon icon={faMapPin} className='fa-sm me-3' />
                {user.place}
              </small>
            )}
          </div>
          
            <div className="col-md-3">
              <Editprofile />


            </div>


            <div className='col-md-1'>
              <Link to={'/review'}><button className='btn btn-success'>Add Review</button></Link>
            </div>
            
        
        </div>
      </div>

      <div className="py-5" style={{ marginLeft: "150px" }}>
        <div className="row w-100">
          <div className="col-md-4 d-flex justify-content-center border bg-light shadow p-3">
            <div className="w-100">
              <h5 className="text-center fw-bold mb-4">Booking Notifications</h5>
              {message?.length > 0 ? (
                <div className="notification-list">
                  {message.map((item, index) => (
                    <div key={index} className="notification-itemmb-3 p-2 border-bottom position-relative">

                      <button
                        onClick={() => handleDeleteMessage(item._id)}
                        className="btn btn-sm btn-outline-danger position-absolute top-0 end-0"
                        style={{ transform: 'translateY(-50%)' }}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                      <div className="d-flex align-items-center mb-1">
                        {getStatusIcon(item.statusUpdate || item.status)}
                        <strong className="me-2">{item.relatedService || item.service}</strong>
                      </div>
                      <div>
                        <small className="text-muted">
                          {formatDate(item.createdAt)} - {item.statusUpdate || item.status}
                        </small>
                      </div>
                      <div className="mt-1">
                        <p className="mb-0 text-break">
                          {item.content || getNotificationMessage(item)}
                        </p>
                        {item.statusUpdate === 'Cancelled' && (
                          <small className="text-muted d-block mt-1">
                            Contact support: 9946901506
                          </small>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted">No notifications yet</p>
              )}
            </div>
          </div>

          <div className="col-md-8">
            <Userdetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default Userprofile;