import React, { useContext, useState, useEffect } from 'react';
import Header from '../component/Header';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { bookingApi, getWorkersByServiceApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';
import { addBookingResponseContext } from '../context/Contextshare';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser';
import Card from 'react-bootstrap/Card';
import { serverUrl } from '../services/serverUrl';

function Bookingforms() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const { setAddResponse } = useContext(addBookingResponseContext);
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [booking, setBooking] = useState({
    service: '',
    petsCount: '',
    petType: '',
    breed: '',
    petSize: '',
    instruction: '',
    pickup: '',
    date: '',
    timeSlot: { start: '', end: '' },
    workerId: '',
    location: '',
  });
  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const existingUser = sessionStorage.getItem('existingUser');
    if (existingUser) {
      setUser(JSON.parse(existingUser));
    }
  }, []);

  useEffect(() => {
    if (booking.service) {
      fetchWorkers(booking.service);
    }
  }, [booking.service]);

  useEffect(() => {
    if (selectedWorker && booking.date) {
      fetchAvailableSlots();
    }
  }, [selectedWorker, booking.date]);

  const fetchWorkers = async (service) => {
    try {
      const response = await getWorkersByServiceApi(service);
      if (response.status === 200) {
        setWorkers(response.data);
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load service providers',
        icon: 'error',
      });
    }
  };

  const fetchAvailableSlots = () => {
    const selectedDate = new Date(booking.date);
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    
    const workerAvailability = selectedWorker.availability.find(
      avail => avail.day === dayName
    );

    if (workerAvailability) {
      const available = workerAvailability.slots.filter(
        slot => slot.status === 'available'
      );
      setAvailableSlots(available);
    } else {
      setAvailableSlots([]);
    }
  };

  const handleSelectChange = (e) => {
    setBooking({ ...booking, service: e.target.value });
    setSelectedWorker(null);
    setBooking(prev => ({ ...prev, timeSlot: { start: '', end: '' } }));
  };

  const handleWorkerSelect = (worker) => {
    setSelectedWorker(worker);
    setBooking(prev => ({ 
      ...prev, 
      workerId: worker._id,
      timeSlot: { start: '', end: '' }
    }));
    setAvailableSlots([]);
  };

  const handleDateChange = (e) => {
    setBooking({ 
      ...booking, 
      date: e.target.value,
      timeSlot: { start: '', end: '' }
    });
  };

  const handleShow = () => {
    if (!selectedWorker) {
      Swal.fire({
        title: 'Select Worker',
        text: 'Please select a service provider',
        icon: 'warning',
      });
      return;
    }

    if (!booking.timeSlot.start || !booking.timeSlot.end) {
      Swal.fire({
        title: 'Select Time Slot',
        text: 'Please select an available time slot',
        icon: 'warning',
      });
      return;
    }

    let price = 1000;
    switch (booking.service) {
      case 'Pet Walking':
      case 'Pet Training':
        price = 3000;
        break;
      case 'Pet Grooming':
      case 'Pet Day Care':
        price = 2000;
        break;
      default:
        price = 1000;
    }
    setAmount(price * (booking.petsCount || 1));
    setShow(true);
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.id]: e.target.value });
  };

  const handleClose = () => setShow(false);

  const handleBook = async () => {
    const { service, petsCount, petType, petSize, date, timeSlot, workerId, location } = booking;

    if (!service || !petsCount || !petType || !petSize || !date || 
        !timeSlot.start || !timeSlot.end || !workerId || !location) {
      Swal.fire({
        title: 'Incomplete Details',
        text: 'Please fill all required fields',
        icon: 'error',
      });
      return;
    }

    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      Swal.fire({
        title: 'Payment Required',
        text: 'Please complete payment information',
        icon: 'warning',
      });
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const finalBooking = {
        service: booking.service,
        serviceDetails: {
          petsCount: booking.petsCount,
          petType: booking.petType,
          breed: booking.breed,
          petSize: booking.petSize,
          instruction: booking.instruction,
        },
        schedule: {
          date: booking.date,
          timeSlot: booking.timeSlot
        },
        location: booking.location,
        workerId: booking.workerId,
        userId: user?._id,
        amount,
        paymentStatus: 'Paid',
      };

      const result = await bookingApi(finalBooking, reqHeader);

      if (result.status >= 200 && result.status < 300) {
        setAddResponse(result.data);

        emailjs.send(
          'service_vpb0x8w',
          'template_msqfgyp',
          {
            to_name: user?.name,
            to_email: user?.email,
            from_name: 'PetPulse',
            message: `Your booking for ${service} with ${selectedWorker.name} is confirmed for ${new Date(date).toLocaleDateString()} from ${timeSlot.start} to ${timeSlot.end}. Total Amount: ₹${amount}`,
          },
          'fJWR5yS3Qq2xMwIPw'
        );

        Swal.fire({
          title: 'Success!',
          text: 'Booking confirmed successfully',
          icon: 'success',
        }).then(() => {
          navigate('/userProfile');
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Booking failed',
        icon: 'error',
      });
    }
  };

  return (
    <>
      <Header />
      <div className="container d-flex align-items-center justify-content-center" style={{ padding: '2px', margin: '20px' }}>
        <div className="row w-100">
          <h3 className="text-center text-black fw-bold mb-4">Book Pet Care Service</h3>
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="booking-form p-4 shadow rounded">
              <Form.Select aria-label="Select service" className="mb-4" value={booking.service} onChange={handleSelectChange}>
                <option value="">Select Service Type</option>
                <option value="Pet Taxi">Pet Taxi</option>
                <option value="Pet Walking">Pet Walking</option>
                <option value="Pet Grooming">Pet Grooming</option>
                <option value="Pet Day Care">Pet Day Care</option>
                <option value="Pet Training">Pet Training</option>
                <option value="Pet Sitting">Pet Sitting</option>
              </Form.Select>

              {booking.service && (
                <div className="workers-section mb-4">
                  <h5 className="mb-3">Available {booking.service} Professionals</h5>
                  <div className="row g-3">
                    {workers.length > 0 ? (
                      workers.map((worker) => (
                        <div className="col-md-6" key={worker._id}>
                          <Card
                            className={`h-100 cursor-pointer ${selectedWorker?._id === worker._id ? 'border-primary' : ''}`}
                            onClick={() => handleWorkerSelect(worker)}
                          >
                            <Card.Body className="d-flex align-items-center">
                              <img
                                src={`${serverUrl}/uploads/${worker.profilePicture}`}
                                alt={worker.name}
                                className="rounded-circle me-3"
                                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                              />
                              <div>
                                <Card.Title>{worker.name}</Card.Title>
                                <Card.Text className="text-muted small">
                                  ⭐ {worker.rating || '4.5'} ({worker.reviews || '50'}+ reviews)
                                  <br />
                                  🏆 {worker.certification?.join(' • ') || 'Certified Professional'}
                                  <br />
                                  🕒 {worker.experience || '2'}+ years experience
                                </Card.Text>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted py-3">No available professionals for this service</div>
                    )}
                  </div>
                </div>
              )}

              <div className="booking-details">
                <h5 className="mb-4">Pet Details</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Form.Control
                      type="number"
                      placeholder="Number of Pets"
                      min="1"
                      value={booking.petsCount}
                      onChange={(e) => setBooking({ ...booking, petsCount: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Select value={booking.petType} onChange={(e) => setBooking({ ...booking, petType: e.target.value })}>
                      <option value="">Select Pet Type</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                    </Form.Select>
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      placeholder="Pet Breed (optional)"
                      value={booking.breed}
                      onChange={(e) => setBooking({ ...booking, breed: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Select value={booking.petSize} onChange={(e) => setBooking({ ...booking, petSize: e.target.value })}>
                      <option value="">Select Pet Size</option>
                      <option value="Small">Small (0-10 kg)</option>
                      <option value="Medium">Medium (10-25 kg)</option>
                      <option value="Large">Large (25-40 kg)</option>
                      <option value="Giant">Giant (40+ kg)</option>
                    </Form.Select>
                  </div>
                  <div className="col-12">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Special Instructions (diet, behavior, etc.)"
                      value={booking.instruction}
                      onChange={(e) => setBooking({ ...booking, instruction: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="date"
                      value={booking.date}
                      onChange={handleDateChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Select 
                      value={`${booking.timeSlot.start} - ${booking.timeSlot.end}`}
                      onChange={(e) => {
                        const [start, end] = e.target.value.split(' - ');
                        setBooking(prev => ({ 
                          ...prev, 
                          timeSlot: { start, end } 
                        }));
                      }}
                      disabled={!selectedWorker || !booking.date || availableSlots.length === 0}
                    >
                      <option value="">Select Time Slot</option>
                      {availableSlots.map((slot, index) => (
                        <option key={index} value={`${slot.start} - ${slot.end}`}>
                          {slot.start} - {slot.end}
                        </option>
                      ))}
                    </Form.Select>
                    {selectedWorker && booking.date && availableSlots.length === 0 && (
                      <small className="text-danger">No available time slots for this date</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <Form.Select value={booking.pickup} onChange={(e) => setBooking({ ...booking, pickup: e.target.value })}>
                      <option value="">Pickup Service Needed?</option>
                      <option value="Yes">Yes, I need pickup</option>
                      <option value="No">No, I'll drop off</option>
                    </Form.Select>
                  </div>
                  <div className="col-md-6">
                    <Form.Select value={booking.location} onChange={(e) => setBooking({ ...booking, location: e.target.value })}>
                      <option value="">Select Location</option>
                      <option value="Pickup">Pickup</option>
                      <option value="At Home">At Home</option>
                    </Form.Select>
                  </div>
                </div>
              </div>

              <div className="d-grid mt-4">
                <button
                  className={`btn btn-lg ${selectedWorker && booking.timeSlot.start ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={handleShow}
                  disabled={!selectedWorker || !booking.timeSlot.start}
                >
                  {selectedWorker && booking.timeSlot.start ? `Proceed to Payment` : 'Complete all fields'}
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="payment-summary p-3 bg-light rounded">
                <h6>Booking Summary</h6>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={`${serverUrl}/uploads/${selectedWorker?.profilePicture}`}
                    alt={selectedWorker?.name}
                    className="rounded-circle me-2"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div>
                    <p className="mb-0 fw-bold">{selectedWorker?.name}</p>
                    <p className="mb-0 text-muted small">{booking.service}</p>
                  </div>
                </div>
                <ul className="list-unstyled small">
                  <li>📅 Date: {new Date(booking.date).toLocaleDateString()}</li>
                  <li>🕒 Time: {booking.timeSlot.start} - {booking.timeSlot.end}</li>
                  <li>🐾 Pets: {booking.petsCount} {booking.petType}</li>
                  <li>📍 Pickup: {booking.pickup || 'Not requested'}</li>
                  <li className="mt-2 fw-bold">Total: ₹{amount}</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <h6 className="mb-3">Payment Information</h6>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Cardholder Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="cardName"
                    placeholder="John Doe"
                    value={paymentDetails.cardName}
                    onChange={handlePaymentChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentChange}
                  />
                </Form.Group>
                <div className="row g-2">
                  <div className="col-8">
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        type="text"
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentDetails.expiryDate}
                        onChange={handlePaymentChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-4">
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        id="cvv"
                        placeholder="123"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentChange}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBook}>
            Confirm Payment ₹{amount}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Bookingforms;