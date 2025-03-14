import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import './pet.css'
import { serverUrl } from '../../../services/serverUrl';
import { useNavigate } from 'react-router-dom';


function PetCards({ pet }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    // Function to calculate time since posting
    const getTimeSincePosting = () => {
        const createdAt = new Date(pet.createdAt);
        const now = new Date();
        const diff = Math.floor((now - createdAt) / 1000); // Difference in seconds
        
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff/60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff/3600)} hours ago`;
        return `${Math.floor(diff/86400)} days ago`;
    };


    const handleShowInterest = () => {
        const userData = JSON.parse(sessionStorage.getItem('adoptionUser'));
        if (!userData) {
          alert('Please login to show interest');
          return;
        }
        
        navigate('/adoption-form', {
          state: {
            pet,
            user: userData
          }
        });
      };
    

    return (
        <>
            <div className="pet">
                <Card className="pet-card">
                    <button className='card-image-btn' onClick={handleShow}>
                        <img 
                            src={`${serverUrl}/uploads/${pet.petimg}`} 
                            alt={pet.name} 
                            className="child-image" 
                        />
                    </button>
                    <Card.Body className="card-body">
                        <Card.Title className="pet-name">{pet.name}</Card.Title>
                        <div className="pet-details">
                            <p><span>Type:</span> {pet.petType}</p>
                            <p><span>Age:</span> {pet.ageYears} years {pet.ageMonths} months</p>
                            <p><span>Breed:</span> {pet.breed}</p>
                            <p><span>Location:</span> {pet.location}</p>
                            <p><span>Posted:</span> {getTimeSincePosting()}</p>
                        </div>
                        <button variant="primary" className="interest-btn" onClick={handleShowInterest}>
                            Show Interest
                        </button>
                    </Card.Body>
                </Card>
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title className="modal-title">{pet.name}'s Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <div className="pet-details-container">
                        <div className="pet-image-gallery">
                            <img
                                src={`${serverUrl}/uploads/${pet.petimg}`}
                                alt={pet.name}
                                className="main-pet-image"
                            />
                        </div>

                        <div className="details-sections">
                            {/* Basic Info */}
                            <div className="detail-section">
                                <h4 className="section-header">
                                    <i className="fas fa-paw"></i> Basic Information
                                </h4>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Name:</span>
                                        <span className="detail-value">{pet.name}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Age:</span>
                                        <span className="detail-value">{pet.ageYears} years {pet.ageMonths} months</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Breed:</span>
                                        <span className="detail-value">{pet.breed}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Gender:</span>
                                        <span className="detail-value">{pet.gender}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Physical Characteristics */}
                            <div className="detail-section">
                                <h4 className="section-header">
                                    <i className="fas fa-dna"></i> Physical Traits
                                </h4>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Size:</span>
                                        <span className="detail-value">{pet.size}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Coat Type:</span>
                                        <span className="detail-value">{pet.coatType}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Health Information */}
                            <div className="detail-section">
                                <h4 className="section-header">
                                    <i className="fas fa-heartbeat"></i> Health Information
                                </h4>
                                <div className="health-details">
                                    <div className="vaccination-card">
                                        <h5>Vaccinations</h5>
                                        <div className="vaccine-list">
                                            {pet.vaccines.map((vaccine, index) => (
                                                <span key={index} className="vaccine-tag">
                                                    <i className="fas fa-syringe"></i> {vaccine}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="medical-notes">
                                        <p><strong>Health Notes:</strong> {pet.healthNotes}</p>
                                        <p><strong>Medication:</strong> {pet.medicationInfo}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Owner Information */}
                            <div className="detail-section">
                                <h4 className="section-header">
                                    <i className="fas fa-user"></i> Owner Information
                                </h4>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Contact Email:</span>
                                        <span className="detail-value">{pet.contactEmail}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Contact Phone:</span>
                                        <span className="detail-value">{pet.contactPhone}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Rehoming Reason:</span>
                                        <span className="detail-value">{pet.justification}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PetCards