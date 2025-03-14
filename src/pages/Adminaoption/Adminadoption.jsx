import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './adminadoption.css'
import { Link } from 'react-router-dom';

function Adminadoption() {
  const [view, setView] = useState('dashboard');
  const [requests, setRequests] = useState([]);
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({
    name: '',
    type: '',
    age: '',
    breed: '',
    status: 'available'
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch adoption requests
        // const requestsResponse = await fetch('/api/adoption-requests');
        // setRequests(await requestsResponse.json());

        // Fetch existing pets
        // const petsResponse = await fetch('/api/pets');
        // setPets(await petsResponse.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddPet = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('/api/pets', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newPet),
      // });
      // const result = await response.json();
      // setPets([...pets, result]);
      setNewPet({ name: '', type: '', age: '', breed: '', status: 'available' });
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      // const response = await fetch(`/api/requests/${requestId}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ action }),
      // });
      // const updatedRequest = await response.json();
      // Update requests state
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} lg={2} className="bg-light sidebar">
          <div className=" pt-3">
            <h4 className="px-3">Admin Dashboard</h4>
            <nav className="flex-column">
              <Button variant="link" onClick={() => setView('dashboard')}>
                Dashboard
              </Button>
             <Link to={'/adoption-request'}>
                <Button variant="link">
                  Adoption Requests
                </Button>
             </Link>
              <Button variant="link" onClick={() => setView('add-pet')}>
                Add New Pet
              </Button>
              <Button variant="link" onClick={() => setView('user-pets')}>
                User Submissions
              </Button>
            </nav>
          </div>
        </Col>

        {/* Main Content */}
        <Col md={9} lg={10} className="p-4">
          {view === 'dashboard' && (
            <>
              <h2>Adoption Overview</h2>
              <Row className="mb-4">
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Total Requests</Card.Title>
                      <Card.Text>Loading...</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Pending Requests</Card.Title>
                      <Card.Text>Loading...</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Approved Pets</Card.Title>
                      <Card.Text>Loading...</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>New Submissions</Card.Title>
                      <Card.Text>Loading...</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          {view === 'requests' && (
            <>
              <h2>Adoption Requests</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Pet Name</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length > 0 ? (
                    requests.map(request => (
                      <tr key={request.id}>
                        <td>{request.petName}</td>
                        <td>{request.user}</td>
                        <td>{request.date}</td>
                        <td>
                          <span className={`badge ${request.status === 'approved' ? 'bg-success' : 'bg-warning'}`}>
                            {request.status}
                          </span>
                        </td>
                        <td>
                          <Button variant="success" size="sm" onClick={() => handleRequestAction(request.id, 'approve')}>
                            <FontAwesomeIcon icon={faCheck} />
                          </Button>{' '}
                          <Button variant="danger" size="sm" onClick={() => handleRequestAction(request.id, 'reject')}>
                            <FontAwesomeIcon icon={faTimes} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No requests found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </>
          )}

          {view === 'add-pet' && (
            <div className="form-container">
              <h2>Add New Pet</h2>
              <Form onSubmit={handleAddPet}>
                <Form.Group className="mb-3">
                  <Form.Label>Pet Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={newPet.name}
                    onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select 
                    value={newPet.type}
                    onChange={(e) => setNewPet({...newPet, type: e.target.value})}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                  <FontAwesomeIcon icon={faPlus} /> Add Pet
                </Button>
              </Form>
            </div>
          )}

          {view === 'user-pets' && (
            <>
              <h2>User Submitted Pets</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Age</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.length > 0 ? (
                    pets.map(pet => (
                      <tr key={pet.id}>
                        <td>{pet.name}</td>
                        <td>{pet.type}</td>
                        <td>{pet.age}</td>
                        <td>
                          <span className={`badge ${pet.status === 'published' ? 'bg-success' : 'bg-secondary'}`}>
                            {pet.status}
                          </span>
                        </td>
                        <td>
                          <Button variant="info" size="sm">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>{' '}
                          <Button variant="danger" size="sm">
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No pets found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Adminadoption;