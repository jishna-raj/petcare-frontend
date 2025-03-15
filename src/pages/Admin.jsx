import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch, 
    faTrash, 
    faMapMarkerAlt, 
    faIdCard, 
    faPhone 
} from '@fortawesome/free-solid-svg-icons';
import Addemployee from '../component/Addemployee';
import { getEmployeeApi, removeEmployeeApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';
import { addEmployeeResponseContext } from '../context/Contextshare';
import Swal from 'sweetalert2';
import './employee.css';

function Admin() {
    const [employee, setEmployee] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { addEmployee } = useContext(addEmployeeResponseContext);
    const navigate = useNavigate();

    const getEmployee = async () => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const result = await getEmployeeApi(reqHeader);
        if (result.data) setEmployee(result.data);
    };

    const logout = () => {
        sessionStorage.removeItem('existingUser');
        sessionStorage.removeItem('token');
        navigate('/');
    };

    const removeEmployee = async (id) => {
        const result = await removeEmployeeApi(id);
        if (result.status === 200) {
            await getEmployee();
            Swal.fire({
                title: 'Deleted!',
                text: 'Employee removed successfully',
                icon: 'success',
                timer: 1500
            });
        }
    };

    const filteredEmployees = employee.filter(emp => 
        emp.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => { getEmployee(); }, [addEmployee]);

    return (
        <div className="admin-container">
            <Navbar expand="lg" className="admin-navbar">
                <Container>
                    <Navbar.Brand>
                        <div className="logo-container">
                            <img 
                                src="animal1.png" 
                                alt="Petpulse Logo" 
                                className="logo-img"
                            />
                            <h3 className="text-dark fw-bold mb-0">PetPulse</h3>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/" className="nav-link">
                                <button className="btn text-dark">Home</button>
                            </Link>
                            <button 
                                className="btn text-dark"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="container">
                <div className="search-container">
                    <div className="position-relative">
                        <input
                            type="text"
                            placeholder="Search employee..."
                            className="search-input p-3"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FontAwesomeIcon 
                            icon={faSearch} 
                            className="search-icon" style={{marginLeft:"520px"}}
                        />
                    </div>
                </div>

                <div className='row'>
                  <div className="col-md-5"></div>
                  <div className="col-md-2">
                  <div className="d-flex justify-content-center mb-4">
                      <Addemployee />
                  </div>
                  </div>
                  <div className="col-md-5"></div>
                  
                </div>

                <div className="employee-grid">
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((item) => (
                            <div key={item._id} className="employee-card">
                                <div className="employee-header">
                                    <img
                                        src={`${serverUrl}/uploads/${item.img}`}
                                        alt={item.name}
                                        className="employee-avatar"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `${serverUrl}/uploads/default-profile.png`;
                                        }}
                                    />
                                    <div className="employee-info">
                                        <h4 className="employee-name">{item.name}</h4>
                                        <p className="employee-designation">{item.designation}</p>
                                    </div>
                                </div>

                                <div className="employee-details">
                                    <div className="detail-item">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="detail-icon" />
                                        <span>{item.place || 'Not specified'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <FontAwesomeIcon icon={faIdCard} className="detail-icon" />
                                        <span>{item.license || 'No license'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <FontAwesomeIcon icon={faPhone} className="detail-icon" />
                                        <span>{item.mobile || 'No contact'}</span>
                                    </div>
                                    <div className="text-end mt-3">
                                        <button 
                                            className="delete-btn"
                                            onClick={() => removeEmployee(item._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <h4>{employee.length ? 'No matching employees found' : 'No Employees Found'}</h4>
                            <p>{employee.length ? 'Try different search terms' : 'Start by adding new employees'}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;