import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import './pet.css';
import { serverUrl } from '../../../services/serverUrl';
import { useNavigate } from 'react-router-dom';

function PetCards({ pet }) {
    // Hide pending status pets completely
    if (pet.status === 'pending') {
        return null;
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const getTimeSincePosting = () => {
        const createdAt = new Date(pet.createdAt);
        const now = new Date();
        const diff = Math.floor((now - createdAt) / 1000);
        
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
        return `${Math.floor(diff/86400)}d ago`;
    };

    const handleShowInterest = () => {
        // Block action if pet is adopted
        if (pet.status === 'adopted') return;

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
                        {/* Adoption status badge */}
                        {pet.status === 'adopted' && (
                            <div className="status-badge adopted">
                                Adopted
                            </div>
                        )}
                    </button>
                    
                    <Card.Body className="card-body">
                        <Card.Title className="pet-name">{pet.name}</Card.Title>
                        
                        <div className="pet-details">
                            <p><span>Type:</span> {pet.petType}</p>
                            <p><span>Age:</span> {pet.ageYears}y {pet.ageMonths}m</p>
                            <p><span>Breed:</span> {pet.breed || 'Mixed'}</p>
                            <p><span>Location:</span> {pet.location}</p>
                            <p><span>Posted:</span> {getTimeSincePosting()}</p>
                        </div>

                        {/* Conditional Show Interest button */}
                        <button 
                            className={`interest-btn ${pet.status === 'adopted' ? 'disabled' : ''}`}
                            onClick={handleShowInterest}
                            disabled={pet.status === 'adopted'}
                            aria-label={pet.status === 'adopted' ? 'This pet has been adopted' : 'Show interest in adopting'}
                        >
                            {pet.status === 'adopted' ? 'Already Adopted' : 'Show Interest'}
                        </button>
                    </Card.Body>
                </Card>
            </div>

            {/* Pet Details Modal */}
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title className="modal-title">
                        {pet.name}'s Full Profile
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body className="modal-body">
                    <div className="pet-details-container">
                        <div className="pet-image-gallery">
                            <img
                                src={`${serverUrl}/uploads/${pet.petimg}`}
                                alt={pet.name}
                                className="main-pet-image"
                            />
                            <div className={`status-indicator ${pet.status}`}>
                                Status: {pet.status}
                            </div>
                        </div>

                        <div className="details-sections">
                            {/* Basic Information Section */}
                            <div className="detail-section">
                                <h4 className="section-header">Basic Information</h4>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <span>Gender:</span>
                                        <strong>{pet.gender}</strong>
                                    </div>
                                    <div className="detail-item">
                                        <span>Size:</span>
                                        <strong>{pet.size}</strong>
                                    </div>
                                    <div className="detail-item">
                                        <span>Coat Type:</span>
                                        <strong>{pet.coatType || 'N/A'}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Health Information Section */}
                            <div className="detail-section">
                                <h4 className="section-header">Health Information</h4>
                                <div className="health-details">
                                    <div className="vaccination-info">
                                        <h5>Vaccinations:</h5>
                                        <div className="vaccine-tags">
                                            {pet.vaccines?.length > 0 ? (
                                                pet.vaccines.map((vaccine, index) => (
                                                    <span key={index} className="vaccine-tag">
                                                        {vaccine}
                                                    </span>
                                                ))
                                            ) : 'No vaccinations recorded'}
                                        </div>
                                    </div>
                                    <div className="medical-notes">
                                        <p><strong>Health Notes:</strong> {pet.healthNotes || 'N/A'}</p>
                                        <p><strong>Medications:</strong> {pet.medicationInfo || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Owner Information Section */}
                            <div className="detail-section">
                                <h4 className="section-header">Owner Information</h4>
                                <div className="contact-details">
                                    <p><strong>Email:</strong> {pet.contactEmail}</p>
                                    <p><strong>Phone:</strong> {pet.contactPhone}</p>
                                    <p><strong>Rehoming Reason:</strong> {pet.justification}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PetCards;