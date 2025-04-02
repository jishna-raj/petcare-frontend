import React, {useEffect, useState } from 'react';

import { getAllBookingApi } from '../../services/allApi';

import Userforadmin from '../../component/Userforadmin';
import './AdminGroom.css';
import { Link } from 'react-router-dom';



function AdminGroom() {
    const [booking, setBooking] = useState([]);


    const getbooking = async () => {
        try {
            const result = await getAllBookingApi();
            console.log(result);

            if (result.data) {
                setBooking(result.data.data);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };


    /*   console.log(booking); */


    useEffect(() => {
        getbooking();
    }, []);


    return (
        <div className="admin-groom-container p-5">
            <Link to={'/admin-dashboard'} style={{textDecoration:"none"}}><h3 className="mb-4 text-center section-title">Grooming Bookings</h3></Link>
            <div className="row w-100">
                {booking?.length > 0 ?
                    booking.map((item, index) => {
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
                                            <span className="detail-value">{item.serviceDetails.petsCount} {item.serviceDetails.petType}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Service:</span>
                                            <span className="detail-value service-badge">{item.service}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Breed:</span>
                                            <span className="detail-value">{item.serviceDetails.breed}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Pickup:</span>
                                            <span className="detail-value">{item.location}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Date:</span>
                                            <span className="detail-value date-badge">
                                                {new Date(item.schedule.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <div className="d-flex justify-content-between align-items-center">
                                            {/*  <button 
                                                className={`btn ${isConfirmed ? 'confirmed-btn' : 'confirm-btn'}`}
                                                onClick={() => handleMessage(item._id, item.userId, item.service, item.date)}
                                                disabled={isConfirmed}
                                            >
                                                <FontAwesomeIcon 
                                                    icon={isConfirmed ? faCheckCircle : faCheck} 
                                                    className="me-2" 
                                                />
                                                {isConfirmed ? 'Confirmed' : 'Confirm'}
                                            </button> */}

                                            <button className='btn btn-secondary me-2 fw-bold' disabled>status:{item.status}</button>
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