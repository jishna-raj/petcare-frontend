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

    {/* About Section */}
    <section className="about-section">
        <div className="about-content">
          <h2>Why Choose Us?</h2>
          <p>
            At Paws & Hearts, we believe every dog deserves a loving home. 
            Our mission is to connect you with your perfect furry friend while 
            ensuring a safe and ethical adoption process. All our dogs are 
            vaccinated, neutered, and ready to become part of your family.
          </p>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>500+</h3>
              <p>Successful Adoptions</p>
            </div>
            <div className="stat-card">
              <h3>98%</h3>
              <p>Happy Families</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Support Available</p>
            </div>
          </div>
        </div>
      </section>

    {/* How It Works Section */}
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <span className="step-icon">1</span>
          <h3>Browse Dogs</h3>
          <p>Explore our gallery of adorable dogs waiting for their forever homes.</p>
        </div>
        <div className="step">
          <span className="step-icon">2</span>
          <h3>Meet & Greet</h3>
          <p>Schedule a visit to meet your potential new family member.</p>
        </div>
        <div className="step">
          <span className="step-icon">3</span>
          <h3>Adopt & Love</h3>
          <p>Complete the adoption process and bring your new friend home!</p>
        </div>
      </div>
    </section>



    <section className="faq-section">
  <div className="faq-container">
    <div className="faq-header">
      <h2 className="faq-title">Common Questions</h2>
      <p className="faq-subtitle">Find answers to frequently asked questions about our pet adoption process</p>
      <div className="faq-divider"></div>
    </div>
    
    <div className="faq-grid">
      <div className="faq-item">
        <div className="faq-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div className="faq-content">
          <h3 className="faq-question">What are the adoption requirements?</h3>
          <p className="faq-answer">We require a valid ID, proof of address, and a brief home check to ensure a safe environment. All household members should be present during the adoption process.</p>
        </div>
      </div>
      
      <div className="faq-item">
        <div className="faq-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div className="faq-content">
          <h3 className="faq-question">Can I return a pet if it doesn't work out?</h3>
          <p className="faq-answer">We offer a 30-day trial period and lifetime return policy for all adoptions. We understand that sometimes despite best efforts, a match may not be perfect.</p>
        </div>
      </div>
      
      <div className="faq-item">
        <div className="faq-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div className="faq-content">
          <h3 className="faq-question">How long does the adoption process take?</h3>
          <p className="faq-answer">The adoption process typically takes 1-3 days from application to bringing your new pet home, depending on the completion of required checks.</p>
        </div>
      </div>
      
      <div className="faq-item">
        <div className="faq-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div className="faq-content">
          <h3 className="faq-question">What fees are involved in adoption?</h3>
          <p className="faq-answer">Our adoption fees range from $50-$200 depending on the animal and age. This covers vaccinations, microchipping, and spay/neuter procedures.</p>
        </div>
      </div>
    </div>
    
    <div className="faq-footer">
      <p>Don't see your question? <a href="/contact" className="faq-link">Contact us</a> for more information.</p>
    </div>
  </div>
</section>




<section className="newsletter-cta">
  <div className="cta-content">
    <h2>Stay Pawsitive!</h2>
    <p>Subscribe to get updates on new arrivals and adoption tips</p>
    <form className="newsletter-form">
      <input type="email" placeholder="Enter your email" />
      <button type="submit" className="btn btn-success">Subscribe</button>
    </form>
  </div>
</section>
    

  </div>
  );
}

export default AdoptionHome;