import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function GroomerUpdation({ groomerData, onSave }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        certification: [],
        license: '',
        availability: []
    });

    useEffect(() => {
        if (groomerData) {
            setFormData({
                certification: groomerData.certification || [],
                license: groomerData.license || '',
                availability: groomerData.availability || []
            });
        }
    }, [groomerData, show]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCertificationChange = (index, value) => {
        const updatedCertifications = [...formData.certification];
        updatedCertifications[index] = value;
        setFormData(prev => ({ ...prev, certification: updatedCertifications }));
    };

    const addCertification = () => {
        setFormData(prev => ({
            ...prev,
            certification: [...prev.certification, '']
        }));
    };

    const removeCertification = (index) => {
        const updatedCertifications = formData.certification.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, certification: updatedCertifications }));
    };

    const addTwoHours = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setHours(date.getHours() + 2);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const handleAvailabilityChange = (dayIndex, slotIndex, field, value) => {
        const updatedAvailability = [...formData.availability];
        if (!updatedAvailability[dayIndex]) {
            updatedAvailability[dayIndex] = { day: '', slots: [] };
        }
        
        if (field === 'day') {
            updatedAvailability[dayIndex].day = value;
        } else {
            if (!updatedAvailability[dayIndex].slots[slotIndex]) {
                updatedAvailability[dayIndex].slots[slotIndex] = { start: '', end: '', status: 'available' };
            }
            
            if (field === 'start') {
                const endTime = addTwoHours(value);
                updatedAvailability[dayIndex].slots[slotIndex].start = value;
                updatedAvailability[dayIndex].slots[slotIndex].end = endTime;
            } else {
                updatedAvailability[dayIndex].slots[slotIndex][field] = value;
            }
        }
        
        setFormData(prev => ({ ...prev, availability: updatedAvailability }));
    };

    const addAvailabilitySlot = (dayIndex) => {
        const updatedAvailability = [...formData.availability];
        if (!updatedAvailability[dayIndex]) {
            updatedAvailability[dayIndex] = { day: '', slots: [] };
        }
        updatedAvailability[dayIndex].slots.push({ 
            start: '', 
            end: '', 
            status: 'available' 
        });
        setFormData(prev => ({ ...prev, availability: updatedAvailability }));
    };

    const removeAvailabilitySlot = (dayIndex, slotIndex) => {
        const updatedAvailability = [...formData.availability];
        updatedAvailability[dayIndex].slots = updatedAvailability[dayIndex].slots.filter((_, i) => i !== slotIndex);
        setFormData(prev => ({ ...prev, availability: updatedAvailability }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        handleClose();
    };

    return (
        <>
            <button className="btn btn-primary btn-full" onClick={handleShow}>
                Edit Profile
            </button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Groomer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>License</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="license"
                                    value={formData.license}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Certifications</Form.Label>
                            <Col sm={9}>
                                {formData.certification.map((cert, index) => (
                                    <div key={index} className="d-flex mb-2">
                                        <Form.Control
                                            type="text"
                                            value={cert}
                                            onChange={(e) => handleCertificationChange(index, e.target.value)}
                                        />
                                        <Button
                                            variant="danger"
                                            onClick={() => removeCertification(index)}
                                            className="ms-2"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="secondary" onClick={addCertification} className="mt-2">
                                    Add Certification
                                </Button>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Availability</Form.Label>
                            <Col sm={9}>
                                {formData.availability.map((day, dayIndex) => (
                                    <div key={dayIndex} className="mb-3 p-3 border rounded">
                                        <div className="d-flex mb-2">
                                            <Form.Select
                                                value={day.day || ''}
                                                onChange={(e) => handleAvailabilityChange(dayIndex, 0, 'day', e.target.value)}
                                            >
                                                <option value="">Select day</option>
                                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                                                    <option key={d} value={d}>{d}</option>
                                                ))}
                                            </Form.Select>
                                        </div>

                                        {day.slots?.map((slot, slotIndex) => (
                                            <div key={slotIndex} className="d-flex align-items-center mb-2">
                                                <Form.Control
                                                    type="time"
                                                    value={slot.start || ''}
                                                    onChange={(e) => handleAvailabilityChange(dayIndex, slotIndex, 'start', e.target.value)}
                                                    className="me-2"
                                                />
                                                <span>to</span>
                                                <span className="mx-2">
                                                    {slot.end || '00:00'}
                                                </span>
                                                <Form.Select
                                                    value={slot.status || 'available'}
                                                    onChange={(e) => handleAvailabilityChange(dayIndex, slotIndex, 'status', e.target.value)}
                                                    style={{ width: '120px' }}
                                                >
                                                    <option value="available">Available</option>
                                                    <option value="booked">Not available</option>
                                                </Form.Select>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => removeAvailabilitySlot(dayIndex, slotIndex)}
                                                    className="ms-2"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}

                                        <Button 
                                            variant="secondary" 
                                            onClick={() => addAvailabilitySlot(dayIndex)}
                                            size="sm"
                                        >
                                            Add Time Slot
                                        </Button>
                                    </div>
                                ))}

                                <Button 
                                    variant="secondary" 
                                    onClick={() => setFormData(prev => ({
                                        ...prev,
                                        availability: [...prev.availability, { day: '', slots: [] }]
                                    }))}
                                    className="mt-2"
                                >
                                    Add Day
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default GroomerUpdation;