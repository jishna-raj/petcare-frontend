import React from 'react'
import About from '../component/About'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import '../pages/Adoption/adoption.css';
import Testimonials from '../component/Testimonials';


function Landing() {
  return (
    <>
      <div style={{ backgroundImage: 'url(bk2.jpg)', width: '100%', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '0px 0px 10px 10px' }}>

        {/* nav bar */}
        <div className='container p-3'>
          <Navbar expand="lg" className='nav'>
            <Container>
              <Navbar.Brand href="#home">
                <div className='d-flex'>
                  <img src="animal1.png" className='' width={'40px'} height={'40px'} alt="" />
                  <h3 className='text-white fw-bolder mt-2 ms-1'>Petpulse</h3>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto ">
                  <Link to={'/home'} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='text-white'>Home</Nav.Link></Link>
                  <Link to={'/login'} style={{ textDecoration: 'none' }}><Nav.Link href="#link" className='text-white'>Login</Nav.Link></Link>
                  <Link to={'/register'} style={{ textDecoration: 'none' }}> <Nav.Link href="#Auth" className='text-white'>Register</Nav.Link></Link>

                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

        </div>
        <div className='container d-flex align-items-center justiy-content-center' style={{ minHeight: '50vh' }}>
          <div className="row w-100">
            <div className="col-md-6  py-5">
              <div>
                <h1 className='fw-bold heading text-white'>Nurture Your Furry Family:<br /> Complete Pet Care & Adoption Solutions</h1>
                <div className='d-flex mt-4'>
                  <FontAwesomeIcon icon={faFacebook} className='fa-xl ms-1 text-white rounded-circle border p-2 ' />
                  <FontAwesomeIcon icon={faInstagram} className='fa-xl ms-4 text-white rounded-circle border p-2 ' />
                  <FontAwesomeIcon icon={faTwitter} className='fa-xl ms-4 text-white rounded-circle border p-2 ' />

                </div>
              </div>
            </div>
            <div className="col-md-6 px-md-5 d-flex flex-column clm" >
              <div className='mt-auto  p-4 rounded land shadow-lg'>
                <h5 className='text-white '>We provides always our best services for our clients and always try to achieve our clients trust and satisfaction</h5>
                <button className='btn btn-dark'>Learn more</button>

              </div>

            </div>
          </div>

        </div>

      </div>




      <div className="adoption-home">

        {/* About Section */}
        <section className="about-section">
          <div className="about-content">
            <h2>Why Choose Us?</h2>
            <p>
              At VelwetPaw, we believe every pet deserves a loving home and exceptional care. Our mission is to connect you with your perfect furry friend while ensuring a safe, ethical adoption process, and to provide comprehensive pet care services that support your companion's wellbeing throughout their life. All our adoptable dogs are vaccinated, neutered, and ready to become part of your family.
            </p>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>500+</h3>
                <p>Happy Customers</p>
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

        <div className='mt-5'>
          <About />
        </div>

        {/* How It Works Section */}
        <section className="how-it-works">
          <h2>Complete Pet Services: Adoption & Care</h2>
          <div className="steps">
            <div className="step">
              <span className="step-icon">1</span>
              <h3>Find Your Perfect Match</h3>
              <p>Browse our gallery of adorable dogs and schedule a visit to meet your potential new family member.</p>
            </div>

            <div className="step">
              <span className="step-icon">2</span>
              <h3>Meet & Connect</h3>
              <p>Schedule a visit to our adoption center where you can spend quality time getting to know your potential new family member in a comfortable environment.</p>
            </div>
            <div className="step">
              <span className="step-icon">3</span>
              <h3>Bring Home & Bond</h3>
              <p>Complete the adoption process and welcome your new friend to their forever home!</p>
            </div>
            <div className="step">
              <span className="step-icon">4</span>
              <h3>Premium Grooming</h3>
              <p>Keep your pet looking their best with baths, brushing, trimming and professional styling.</p>
            </div>
            <div className="step">
              <span className="step-icon">5</span>
              <h3>Professional Care</h3>
              <p>Support your pet's wellbeing with our sitting, walking, and positive reinforcement training services.</p>
            </div>
            <div className="step">
              <span className="step-icon">6</span>
              <h3>Complete Care Packages</h3>
              <p>Customize a full-service plan combining grooming, exercise, training and health monitoring for your pet.</p>
            </div>
          </div>
        </section>



        <Testimonials/>



        <section className="faq-section">
          <div className="faq-container">
            <div className="faq-header">
              <h2 className="faq-title">Common Questions</h2>
              <p className="faq-subtitle">Find answers to your questions about our pet adoption process & pet care</p>
              <div className="faq-divider"></div>
            </div>

            <div className='row'>
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

                    <h3 className="faq-question">What methods do you use for pet training?</h3>
                    <p className="faq-answer">We exclusively use positive reinforcement training techniques that reward good behavior rather than punishing unwanted behavior. This scientifically-proven approach for creates lasting behavioral changes.</p>

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

                    <h3 className="faq-question">How often should I have my dog groomed?</h3>
                    <p className="faq-answer">Most dogs benefit from professional grooming every 4-8 weeks depending on their breed, coat type, and lifestyle. Longer-haired breeds typically require more frequent grooming to prevent matting and skin issues.</p>

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

                    <h3 className="faq-question">How do I prepare my home for a pet sitter?</h3>
                    <p className="faq-answer">Please leave detailed care instructions, emergency contact information, veterinarian details, adequate food and supplies, and a spare house key. We recommend a meet-and-greet before your first scheduled service.</p>

                  </div>
                </div>
              </div>
            </div>

            <div className="faq-footer">
              <p>Don't see your question? <a href="/contact" className="faq-link">Contact us</a> for more information.</p>
            </div>
          </div>
        </section>



      </div>


    </>
  )
}

export default Landing