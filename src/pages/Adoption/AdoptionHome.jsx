import React from 'react';
import './adoption.css'; 
import { Link } from 'react-router-dom';

function AdoptionHome() {
  return (
    <div className="adoption-home">
    {/* Hero Section */}
    <section className="hero-section">
      <div className="hero-content">
        <h1 className='text-light'>Welcome to TheVelvetPaw</h1>
        <p>Your journey to finding a loyal companion starts here.</p>
        <Link to={'/adreg'}><button className="btn btn-success p-3">Explore Adoptions</button></Link
       >
      </div>
    </section>


  </div>
  );
}

export default AdoptionHome;