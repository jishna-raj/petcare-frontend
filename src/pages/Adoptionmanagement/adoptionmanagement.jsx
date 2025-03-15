import React, { useState } from 'react';
import ApprovedRequests from './ApprovedRequests';
import PetAdding from './PetAdding';
import './AdoptionManagement.css'; // Create this CSS file
import Pet from './Pet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faClipboardList, 
    faCheckCircle, 
    faPlusSquare, 
    faPaw 
} from '@fortawesome/free-solid-svg-icons';
import Selected from './Selected';

function AdoptionManagement() {
  const [activeTab, setActiveTab] = useState('adoptionRequests');

  return (
    <div className="adoption-management-container">
      <div className="glassmorphic-header">
        <h1 className="management-title">
          <span className="title-icon">🐾</span>
          Adoption Management
        </h1>
      </div>
      
      <div className="nav-container">
        <div className="tab-nav">
          <button 
            className={`tab-btn ${activeTab === 'adoptionRequests' ? 'active' : ''}`}
            onClick={() => setActiveTab('adoptionRequests')}
          >
            <FontAwesomeIcon icon={faClipboardList} className="tab-icon" />
            Pending Requests
            <div className="underline"></div>
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'approvedRequests' ? 'active' : ''}`}
            onClick={() => setActiveTab('approvedRequests')}
          >
            <FontAwesomeIcon icon={faCheckCircle} className="tab-icon" />
            Approved
            <div className="underline"></div>
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'petAdding' ? 'active' : ''}`}
            onClick={() => setActiveTab('petAdding')}
          >
            <FontAwesomeIcon icon={faPlusSquare} className="tab-icon" />
            Add Pets
            <div className="underline"></div>
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'pets' ? 'active' : ''}`}
            onClick={() => setActiveTab('pets')}
          >
            <FontAwesomeIcon icon={faPaw} className="tab-icon" />
            Manage Pets
            <div className="underline"></div>
          </button>
        </div>
      </div>

      <div className="content-container">
        <div className="animated-content">
          {activeTab === 'adoptionRequests' && <ApprovedRequests />}
          {activeTab === 'approvedRequests' && <Selected/>}
          {activeTab === 'petAdding' && <PetAdding />}
          {activeTab === 'pets' && <Pet />}
        </div>
      </div>
    </div>
  );
}

export default AdoptionManagement;