import React, { useEffect, useState } from 'react';
import { getAllRequestsApi, updateRequestStatusApi, addNotificationApi } from '../../services/allApi';
import { Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import moment from 'moment';
import { serverUrl } from '../../services/serverUrl';

function ApprovedRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch and filter pending requests on component mount
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getAllRequestsApi();
                console.log(response);
                
                if (response.data?.success) {
                    const pendingRequests = response.data.data.filter(
                        request => request.status === 'pending'
                    );
                    setRequests(pendingRequests);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    // Handle both approval and rejection of requests
    const handleStatusUpdate = async (requestId, status) => {
        try {
            const request = requests.find(r => r._id === requestId);
            if (!request) {
                alert('Request not found');
                return;
            }
    
            // Update request status in backend
            const response = await updateRequestStatusApi(requestId, { status });
            
            if (response.data?.success) {
                // Create appropriate notification for the current request
                await addNotificationApi({
                    user: request.user._id,
                    adoptionRequest: requestId,
                    pet: request.pet._id,
                    type: `${status}_adoption`,
                    message: status === 'approved' 
                        ? `🎉 Congratulations! Your adoption request for ${request.pet?.name} has been approved!`
                        : `😞 We're sorry, your adoption request for ${request.pet?.name} has been rejected.`
                });
    
                // If approved, reject all other pending requests for the same pet
                if (status === 'approved') {
                    const petId = request.pet._id;
                    // Find all other pending requests for the same pet
                    const otherRequests = requests.filter(r => 
                        r.pet._id === petId && 
                        r._id !== requestId && 
                        r.status === 'pending'
                    );
    
                    // Update each of the other requests to 'rejected' and create notifications
                    const updatePromises = otherRequests.map(async (otherRequest) => {
                        await updateRequestStatusApi(otherRequest._id, { status: 'rejected' });
                        await addNotificationApi({
                            user: otherRequest.user._id,
                            adoptionRequest: otherRequest._id,
                            pet: otherRequest.pet._id,
                            type: 'rejected_adoption',
                            message: `😞 We're sorry, your adoption request for ${otherRequest.pet?.name} has been rejected because another request was approved.`
                        });
                    });
    
                    // Wait for all updates to complete
                    await Promise.all(updatePromises);
    
                    // Remove all affected requests (approved + rejected) from the UI
                    const idsToRemove = [requestId, ...otherRequests.map(r => r._id)];
                    setRequests(prev => prev.filter(r => !idsToRemove.includes(r._id)));
                } else {
                    // If rejected, just remove the current request
                    setRequests(prev => prev.filter(r => r._id !== requestId));
                }
            }
        } catch (error) {
            alert(error.response?.data?.message || `Failed to ${status} request`);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <Alert variant="danger" className="mx-3 mt-3">
                Error: {error}
            </Alert>
        );
    }

    // Main component render
    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center">Pending Adoption Requests</h2>
            
            {requests.length === 0 ? (
                <Alert variant="info" className="text-center">
                    No pending adoption requests to review
                </Alert>
            ) : (
                <div className="row g-4">
                    {requests.map(request => (
                        <div key={request._id} className="col-md-6 col-lg-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Body className="d-flex flex-column">
                                    {/* Pet Image Section */}
                                    <div className="text-center mb-3">
                                        <img 
                                            src={`${serverUrl}/uploads/${request.pet?.petimg}`} 
                                            alt={request.pet?.name} 
                                            className="img-fluid rounded"
                                            style={{ 
                                                maxHeight: '200px',
                                                objectFit: 'cover',
                                                width: '100%'
                                            }}
                                        />
                                    </div>

                                    {/* Status and Date Section */}
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <Badge bg="warning" className="text-capitalize fs-6">
                                            ⏳ Pending Review
                                        </Badge>
                                        <small className="text-muted">
                                            Requested: {moment(request.createdAt).format('MMM D, YYYY')}
                                        </small>
                                    </div>

                                    {/* Pet Information Section */}
                                    <Card.Title className="mb-3">
                                        <span className="h4">{request.pet?.name || 'Unnamed Pet'}</span>
                                        <div className="text-muted">
                                            {request.pet?.petType} • {request.pet?.breed || 'Mixed Breed'}
                                        </div>
                                    </Card.Title>

                                    {/* Requester Details Section */}
                                    <div className="mb-3">
                                        <h5 className="text-primary">Adopter Information</h5>
                                        <div className="ps-3">
                                            <p className="mb-1">
                                                <strong>Name:</strong> {request.user?.username || 'Anonymous'}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Email:</strong> {request.user?.email || 'Not provided'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Adoption Details Section */}
                                    <div className="mb-3 flex-grow-1">
                                        <h5 className="text-primary">Adoption Details</h5>
                                        <div className="ps-3">
                                            <p className="mb-1">
                                                <strong>Reason:</strong> {request.adoptionReason || 'No reason provided'}
                                            </p>
                                            <p className="mb-0">
                                                <strong>Experience:</strong> {request.previousExperience || 'No experience listed'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons Section */}
                                    <div className="d-grid gap-2 mt-auto">
                                        <div className="btn-group">
                                            <Button 
                                                variant="success" 
                                                onClick={() => handleStatusUpdate(request._id, 'approved')}
                                                className="flex-grow-1"
                                            >
                                                ✅ Approve
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                onClick={() => handleStatusUpdate(request._id, 'rejected')}
                                                className="flex-grow-1"
                                            >
                                                ❌ Reject
                                            </Button>
                                        </div>
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

export default ApprovedRequests;