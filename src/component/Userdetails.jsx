import { faCheckCircle, faChevronDown, faChevronUp, faPaw, faUserTie, faMapMarkerAlt, faCalendarAlt, faClock, faMoneyBillWave, faInfoCircle, faWalking, faCut, faTaxi, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { getBookingApi } from '../services/allApi';
import { addBookingResponseContext } from '../context/Contextshare';
import dayjs from 'dayjs';


function Userdetails() {
  const [userbooking, setUserBooking] = useState([]);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addResponse } = useContext(addBookingResponseContext);




  const getBooking = async () => {
    const token = sessionStorage.getItem("token");
    const existingUserData = sessionStorage.getItem("existingUser");
    const existingUser = JSON.parse(existingUserData);
    const userId = existingUser._id;

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    try {
      setLoading(true);
      const result = await getBookingApi(userId, reqHeader);
      if (result.data && result.data.data) {
        setUserBooking(result.data.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(userbooking);

  useEffect(() => {
    getBooking();
  }, [addResponse]);

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MMMM D, YYYY');
  };

  
  

  const getStatusBadge = (status) => {
    let badgeClass = '';
    let icon = null;

    switch (status) {
      case 'Confirmed':
        badgeClass = 'bg-primary';
        icon = faCheckCircle;
        break;
      case 'Completed':
        badgeClass = 'bg-success';
        icon = faCheckCircle;
        break;
      case 'Cancelled':
        badgeClass = 'bg-danger';
        icon = faTimes;
        break;
      default:
        badgeClass = 'bg-secondary';
    }

    return (
      <span className={`badge ${badgeClass} d-flex align-items-center`}>
        {icon && <FontAwesomeIcon icon={icon} className="me-1" />}
        {status}
      </span>
    );
  };

  const toggleExpand = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'Pet Walking':
        return <FontAwesomeIcon icon={faWalking} className="me-2" />;
      case 'Pet Grooming':
        return <FontAwesomeIcon icon={faCut} className="me-2" />;
      case 'Pet Sitting':
        return <FontAwesomeIcon icon={faHome} className="me-2" />;
      case 'Pet Daycare':
        return <FontAwesomeIcon icon={faSun} className="me-2" />;
      case 'Pet Taxi':
        return <FontAwesomeIcon icon={faTaxi} className="me-2" />;
      case 'Pet Training':
        return <FontAwesomeIcon icon={faGraduationCap} className="me-2" />;
      default:
        return <FontAwesomeIcon icon={faPaw} className="me-2" />;
    }
  };

  return (
   
      <div className="col-md-11 bg-white shadow-sm rounded p-4">
        <h3 className="text-center fw-bold mb-4">Booking History</h3>
  
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading bookings...</p>
          </div>
        ) : userbooking?.length > 0 ? (
          <div className="booking-container">
            {userbooking.map((item) => (
              <div key={item.id} className="booking-card mb-3 border rounded">
                {/* Summary Portion */}
                <div
                  className="summary p-3 d-flex justify-content-between align-items-center cursor-pointer"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="fw-bold">
                        {getServiceIcon(item.service)}
                        {item.service}
                      </div>
                      <small className="text-muted">
                        <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                        {formatDate(item.schedule?.date)}
                      </small>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  <FontAwesomeIcon
                    icon={expandedBooking === item.id ? faChevronUp : faChevronDown}
                    className="ms-2"
                  />
                </div>
  
                {/* Detailed Portion */}
                {expandedBooking === item.id && (
                  <div className="details p-3 border-top bg-light">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="detail-section mb-3">
                          <h6 className="fw-bold text-primary">
                            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                            Service Details
                          </h6>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <strong>Service:</strong> {item.service}
                            </li>
                            <li className="mb-2">
                              <strong>
                                <FontAwesomeIcon icon={faUserTie} className="me-2" />
                                Worker:
                              </strong> {item.worker?.name || 'Not assigned'}
                            </li>
                            <li className="mb-2">
                              <strong>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                Location:
                              </strong> {item.location}
                            </li>
                          </ul>
                        </div>
  
                        <div className="detail-section">
                          <h6 className="fw-bold text-primary">
                            <FontAwesomeIcon icon={faClock} className="me-2" />
                            Schedule
                          </h6>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <strong>Date:</strong> {item.schedule?.date ? formatDate(item.schedule.date) : 'Not specified'}
                            </li>
                          </ul>
                        </div>
                      </div>
  
                      <div className="col-md-6">
                        <div className="detail-section mb-3">
                          <h6 className="fw-bold text-primary">
                            <FontAwesomeIcon icon={faPaw} className="me-2" />
                            Pet Details
                          </h6>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <strong>Type:</strong> {item.pets?.type}
                            </li>
                            <li className="mb-2">
                              <strong>Breed:</strong> {item.pets?.breed || 'N/A'}
                            </li>
                            <li className="mb-2">
                              <strong>Size:</strong> {item.pets?.size || 'N/A'}
                            </li>
                            <li className="mb-2">
                              <strong>Count:</strong> {item.pets?.count || 1}
                            </li>
                          </ul>
                        </div>
  
                        <div className="detail-section">
                          <h6 className="fw-bold text-primary">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                            Payment
                          </h6>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <strong>Amount:</strong> ₹{item.payment?.amount || 'N/A'}
                            </li>
                            <li className="mb-2">
                              <strong>Status:</strong> {item.payment?.status || 'N/A'}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
  
                    {item.pets?.instructions && (
                      <div className="mt-3 p-3 bg-white rounded">
                        <h6 className="fw-bold text-primary">
                          <FontAwesomeIcon icon={faClipboard} className="me-2" />
                          Special Instructions
                        </h6>
                        <p className="mb-0">{item.pets.instructions}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="empty-state">
              <FontAwesomeIcon icon={faCalendarAlt} size="3x" className="text-muted mb-3" />
              <h5 className="text-muted">No bookings available</h5>
              <p className="text-muted">You haven't made any bookings yet</p>
            </div>
          </div>
        )}
      </div>
   
  );
}

export default Userdetails;