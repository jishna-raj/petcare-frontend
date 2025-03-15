import React, { useContext, useEffect, useState } from 'react';
import { messageSentResponseContext } from '../../context/Contextshare';
import { getAllBookingApi, postMessageApi } from '../../services/allApi';
import Swal from 'sweetalert2';
import Userforadmin from '../../component/Userforadmin';
import './AdminGroom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function AdminGroom() {
    const [booking, setBooking] = useState([]);
    const [confirmedBookings, setConfirmedBookings] = useState({});
    const { setMessagesent } = useContext(messageSentResponseContext);

    const getbooking = async () => {
        try {
            const result = await getAllBookingApi();
            if (result.data) {
                setBooking(result.data);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleMessage = async (bookingId, userId, service, date) => {
        try {
            const reqBody = {
                userId,
                service,
                date
            };
            
            const result = await postMessageApi(reqBody);
            if (result.status === 200) {
                setConfirmedBookings(prev => ({
                    ...prev,
                    [bookingId]: true
                }));
                setMessagesent(result.data);
                Swal.fire({
                    title: 'Confirmed!',
                    text: 'Booking confirmed successfully',
                    icon: 'success'
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to confirm booking',
                icon: 'error'
            });
        }
    };

    useEffect(() => {
        getbooking();
    }, []);

    return (
        <div className="admin-groom-container p-5">
            <h3 className="mb-4 text-center section-title">Grooming Bookings</h3>
            <div className="row w-100">
                {booking?.length > 0 ? 
                    booking.map((item, index) => {
                        const isConfirmed = confirmedBookings[item._id];
                        return (
                            <div key={index} className="col-md-4 col-lg-3 mb-4">
                                <div className="booking-card p-3">
                                    <div className="card-header">
                                        <h6 className="fw-bold card-title">Booking #{index + 1}</h6>
                                        <small className="text-muted booking-id">ID: {item._id?.slice(-6)}</small>
                                    </div>
                                    
                                    <div className="card-body">
                                        <div className="detail-item">
                                            <span className="detail-label">Pets:</span>
                                            <span className="detail-value">{item.petsCount} {item.petType}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Service:</span>
                                            <span className="detail-value service-badge">{item.service}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Breed:</span>
                                            <span className="detail-value">{item.breed}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Instructions:</span>
                                            <span className="detail-value instruction-text">{item.instruction}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Pickup:</span>
                                            <span className="detail-value">{item.pickup}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Date:</span>
                                            <span className="detail-value date-badge">
                                                {new Date(item.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <button 
                                                className={`btn ${isConfirmed ? 'confirmed-btn' : 'confirm-btn'}`}
                                                onClick={() => handleMessage(item._id, item.userId, item.service, item.date)}
                                                disabled={isConfirmed}
                                            >
                                                <FontAwesomeIcon 
                                                    icon={isConfirmed ? faCheckCircle : faCheck} 
                                                    className="me-2" 
                                                />
                                                {isConfirmed ? 'Confirmed' : 'Confirm'}
                                            </button>
                                            <div className="user-admin-wrapper">
                                                <Userforadmin data={item} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : 
                    <div className="no-bookings text-center w-100">
                        <i className="fas fa-paw fa-3x mb-3"></i>
                        <p className="text-muted">No active bookings found</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default AdminGroom;