import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllGroomerApi, updatestatusGroomerApi } from '../services/allApi';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Admin() {
    const [employees, setEmployees] = useState([]); // State to store employees' data

    // Fetch all employees' data
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await getAllGroomerApi(); // Fetch all groomers
            console.log(response);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            toast.error('Failed to fetch employees');
        }
    };

    // Handle status update
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            // Call the API to update the status
            const response = await updatestatusGroomerApi(id, { status: newStatus });

            if (response.status === 200) {
                toast.success('Status updated successfully');
                // Update the local state
                setEmployees((prevEmployees) =>
                    prevEmployees.map((employee) =>
                        employee._id === id ? { ...employee, status: newStatus } : employee
                    )
                );
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };

    return (
        <>
            <div className="employee-container">
                <div className='d-flex justify-content-between'>
                    <h2 className="admin-title">Groomer Requests</h2>
    
                    <div>
                        <Link to={'/groomer'}><button className='btn btn-success me-3'>Groomers</button></Link>
                        <Link to={'/admin-dashboard'}><button className='btn btn-secondary'><FontAwesomeIcon icon={faRotateLeft} /></button></Link>
                    </div>
                </div>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Experience</th>
                            <th>License</th>
                            <th>Certifications</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.address}</td>
                                <td>{employee.experience} years</td>
                                <td>{employee.license}</td>
                                <td>{employee.certification.join(', ')}</td>
                                <td>{employee.status}</td>
                                <td>
                                    <select
                                        value={employee.status}
                                        className="status-select"
                                        onChange={(e) => handleStatusUpdate(employee._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ToastContainer autoClose={2000} theme="colored" position="top-center" />
        </>
    );
}

export default Admin;