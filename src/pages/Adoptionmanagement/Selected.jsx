import React, { useEffect, useState } from 'react';
import { getAllRequestsApi } from '../../services/allApi';
import { Card, Spinner, Alert, Badge } from 'react-bootstrap';
import moment from 'moment';
import { serverUrl } from '../../services/serverUrl';

function Selected() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getAllRequestsApi();
                if (response.data?.success) {
                    // Filter approved requests
                    const approvedRequests = response.data.data.filter(
                        request => request.status === 'approved'
                    );
                    setRequests(approvedRequests);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    if (error) return <Alert variant="danger" className="mx-3 mt-3">{error}</Alert>;

    return (
        <div className="container py-4">
            <h2 className="mb-4">Approved Adoption Requests</h2>
            
            {requests.length === 0 ? (
                <Alert variant="info" className="text-center">
                    No approved adoption requests found
                </Alert>
            ) : (
                <div className="row g-4">
                    {requests.map(request => (
                        <div key={request._id} className="col-md-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <div className="d-flex flex-column align-items-start mb-3">
                                        <div className="image-container3">
                                            <img 
                                                src={`${serverUrl}/uploads/${request.pet?.petimg}`} 
                                                alt="pet" 
                                                className="pet-image"
                                                height={"250px"}
                                                width={'90%'}
                                            />
                                        </div>
                                        <Badge bg="success" className="text-capitalize">
                                            {request.status}
                                        </Badge>
                                        <small className="text-muted fw-bold">
                                            Approved on: {moment(request.updatedAt).format('MMM D, YYYY')}
                                        </small>
                                    </div>

                                    <Card.Title className="mb-3">
                                        {request.pet?.name || 'Unnamed Pet'} - {request.pet?.petType}
                                        <small className="d-block text-muted">
                                            {request.pet?.breed || 'No breed specified'}
                                        </small>
                                    </Card.Title>

                                    <div className="mb-3">
                                        <h6>Adopter Details:</h6>
                                        <p className="mb-1">
                                            <strong>Name:</strong> {request.user?.username || 'Unknown'}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Email:</strong> {request.user?.email || 'No email'}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <h6>Adoption Reason:</h6>
                                        <p>{request.adoptionReason || 'No reason provided'}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Selected;