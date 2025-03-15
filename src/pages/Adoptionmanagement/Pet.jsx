import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner, Form } from 'react-bootstrap';
import { deletepetApi, getAllPetApi, updatepetApi } from '../../services/allApi';
import { serverUrl } from '../../services/serverUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faTrash,
    faPaw,
    faVenusMars,
    faWeight,
    faClock,
    faSyringe,
    faHeartbeat,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import './Pet.css';

function Pet() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedPetId, setSelectedPetId] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    const handleClose = () => {
        setShow(false);
        setSelectedPetId(null);
        setNewStatus('');
    };

    const handleShow = (petId, currentStatus) => {
        setSelectedPetId(petId);
        setNewStatus(currentStatus);
        setShow(true);
    };

    const getTimeSincePosting = (createdAt) => {
        const postDate = new Date(createdAt);
        const now = new Date();
        const diff = Math.floor((now - postDate) / 1000);

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    const handleDelete = async (petId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await deletepetApi(petId);
                setPets(pets.filter(pet => pet._id !== petId));
                Swal.fire('Deleted!', 'Pet has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete pet', 'error');
            }
        }
    };

    const handleUpdate = async () => {
        if (!newStatus) return;
        
        try {
            const response = await updatepetApi(selectedPetId, { status: newStatus });
            if (response.data?.success) {
                setPets(pets.map(pet => 
                    pet._id === selectedPetId ? {...pet, status: newStatus} : pet
                ));
                Swal.fire('Success!', 'Status updated successfully', 'success');
                handleClose();
            }
        } catch (error) {
            Swal.fire('Error!', error.response?.data?.message || 'Failed to update status', 'error');
        }
    };

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getAllPetApi();
                if (response.data?.success) {
                    setPets(response.data.data);
                }
            } catch (err) {
                setError(err.message || 'Error fetching pets');
            } finally {
                setLoading(false);
            }
        };
        fetchPets();
    }, []);

    if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
    if (error) return <div className="text-center text-danger py-5">{error}</div>;

    return (
        <>
            <div className="pet-management">
                <div className="pet-grid">
                    {pets.map(pet => (
                        <Card key={pet._id} className="pet-card1">
                            <div className="card-header-section">
                                <div className="image-container1">
                                    <img
                                        src={`${serverUrl}/uploads/${pet.petimg}`}
                                        alt={pet.name}
                                        className="pet-image1"
                                    />
                                    <div className={`status-badge ${pet.status.toLowerCase()}`}>
                                        {pet.status}
                                    </div>
                                </div>

                                <div className="basic-info">
                                    <h3 className="pet-name">
                                        {pet.name}
                                        <span className="pet-type">{pet.petType}</span>
                                    </h3>
                                    <div className="meta-info">
                                        <span className="meta-item">
                                            <FontAwesomeIcon icon={faVenusMars} />
                                            {pet.gender}
                                        </span>
                                        <span className="meta-item">
                                            <FontAwesomeIcon icon={faWeight} />
                                            {pet.size}
                                        </span>
                                        <span className="meta-item">
                                            <FontAwesomeIcon icon={faClock} />
                                            {getTimeSincePosting(pet.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Card.Body className="card-body">
                                <div className="details-section1">
                                    <div className="detail-group">
                                        <h4><FontAwesomeIcon icon={faPaw} /> Basic Details</h4>
                                        <div className="detail-row">
                                            <div className="detail-item">
                                                <span>Breed:</span>
                                                <span>{pet.breed || 'N/A'}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span>Age:</span>
                                                <span>{pet.ageYears}y {pet.ageMonths}m</span>
                                            </div>
                                            <div className="detail-item">
                                                <span>Location:</span>
                                                <span>{pet.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="detail-group">
                                        <h4><FontAwesomeIcon icon={faHeartbeat} /> Health Information</h4>
                                        <div className="vaccine-section">
                                            {pet.vaccines?.length > 0 ? (
                                                pet.vaccines.map((vaccine, index) => (
                                                    <span key={index} className="vaccine-tag">
                                                        <FontAwesomeIcon icon={faSyringe} /> {vaccine}
                                                    </span>
                                                ))
                                            ) : 'No vaccines listed'}
                                        </div>
                                        <div className="health-notes">
                                            <strong>Health Notes:</strong> {pet.healthNotes || 'N/A'}
                                        </div>
                                    </div>

                                    <div className="detail-group">
                                        <h4><FontAwesomeIcon icon={faUser} /> Owner Information</h4>
                                        <div className="detail-row">
                                            <div className="detail-item">
                                                <span>Contact:</span>
                                                <span>{pet.contactPhone || 'N/A'}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span>Email:</span>
                                                <span>{pet.contactEmail || 'N/A'}</span>
                                            </div>
                                            <div className="detail-item full-width">
                                                <span>Rehoming Reason:</span>
                                                <span>{pet.justification || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>

                            <Card.Footer className="card-footer">
                                <Button variant="outline-danger" onClick={() => handleDelete(pet._id)}>
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </Button>
                                <Button 
                                    variant="primary" 
                                    onClick={() => handleShow(pet._id, pet.status)}
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Update Status
                                </Button>
                            </Card.Footer>
                        </Card>
                    ))}
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Pet Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Select New Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                        >
                            <option value="available">Available</option>
                            <option value="pending">Pending</option>
                            <option value="adopted">Adopted</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Pet;