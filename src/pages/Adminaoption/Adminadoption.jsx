import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPaw, faBath, faTools, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css'; // Create this CSS file
import { Link } from 'react-router-dom';
import Header from '../../component/Header';

function Adminadoption() {
  return (

   <>
      <Header/>
      <div className="admin-dashboard container-fluid py-5">
        <div className="container">
          <h1 className="dashboard-title mb-5">
            <FontAwesomeIcon icon={faChartLine} className="me-3" />
            Admin Dashboard
          </h1>
          
          <div className="row g-4">
            {/* User Management Card */}
            <div className="col-md-6 col-xl-6">
              <div className="dashboard-card user-management">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <h2>User Management</h2>
                <p>Manage user accounts, permissions, and activities</p>
                <Link to={'/usermanagement'}><button className="btn-admin">Manage Users</button></Link>
              </div>
            </div>
  
            {/* Adoption Management Card */}
            <div className="col-md-6 col-xl-6">
              <div className="dashboard-card adoption-management">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faPaw} />
                </div>
                <h2>Adoption Management</h2>
                <p>Oversee pet adoption requests and approvals</p>
               <Link to={'/admanagement'}> <button className="btn-admin">Manage Adoptions</button></Link>
              </div>
            </div>
  
            {/* Grooming Management Card */}
            <div className="col-md-6 col-xl-6">
              <div className="dashboard-card grooming-management">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faBath} />
                </div>
                <h2>Grooming Management</h2>
                <p>Handle grooming appointments and services</p>
                <Link to={'/groomingmanagement'}><button className="btn-admin">Manage Grooming</button></Link>
              </div>
            </div>
  
            {/* Worker Management Card */}
            <div className="col-md-6 col-xl-6">
              <div className="dashboard-card worker-management">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faTools} />
                </div>
                <h2>Worker Management</h2>
                <p>Manage staff members and schedules</p>
                <Link to={'/workermanagement'}><button className="btn-admin">Manage Workers</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default Adminadoption;