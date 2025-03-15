import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getbookingUserApi } from '../services/allApi';

function Userforadmin({ data }) {
  const [show, setShow] = useState(false);
  const [bookingUser, setBookingUser] = useState(null); 

  const handleClose = () => setShow(false);
  
  const handleShow = () => setShow(true);

  const getBookingUser = async () => {
    try {
      // Make sure you're using the correct ID (userId instead of booking ID)
      const result = await getbookingUserApi(data.userId); // Changed to userId
      console.log('API Response:', result);
      
      if (result.status === 200 && result.data) {
        setBookingUser(result.data);
      } else {
        console.error('No user data found');
        setBookingUser(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setBookingUser(null);
    }
  };

  useEffect(() => {
    if (show) {
      getBookingUser();
    }
  }, [show]); // Fetch data when modal opens

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        User details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100">
            <div className="border border-2 rounded p-3 bg-white shadow-sm">
              <h6 className="fw-bold">Details</h6>
              {bookingUser ? (
                <div className="mt-3">
                  <p><strong>Name:</strong> {bookingUser.username}</p>
                  <p><strong>Mobile:</strong> {bookingUser.mobile}</p>
                  <p><strong>Email:</strong> {bookingUser.email}</p>
                  <p><strong>Place:</strong> {bookingUser.place}</p>
                </div>
              ) : (
                <p>{show ? 'Loading user details...' : 'No user data available'}</p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Userforadmin;