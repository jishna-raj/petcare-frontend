import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getbookingUserApi } from '../services/allApi';

function Userforadmin({ data }) {
  const [show, setShow] = useState(false);
  const [bookingUser, setBookingUser] = useState(null); 

  const handleClose = () => setShow(false);
  
  const handleShow = () => {
    setShow(true);
    getBookingUser(data.userId);  
  };

  const getBookingUser = async (id) => {
    try {
      const result = await getbookingUserApi(id);
      setBookingUser(result.data);  // Store the fetched user data in state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

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
                <p>Loading user details...</p>  // Placeholder while loading data
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Userforadmin;
