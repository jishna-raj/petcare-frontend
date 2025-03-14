import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './footer.css'

function Footer() {

  return (
    <>
      <div className="petpulse-footer">
        <div className="container-fluid">
          {/* Main Footer Content */}
          <div className="footer-content p-5">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link to="/" className="brand-link" style={{textDecoration:'none'}}>
                <div className="brand-container">
                  <img
                    alt="PetPulse Logo"
                    src="./animal1.png"
                    className="brand-logo"
                  />
                  <h2 className="brand-text">TheVelvetPaw</h2>
                </div>
              </Link>
              <p className="brand-tagline">Connecting Hearts with Paws</p>

              <div className="social-container">
                <h6 className="social-title">Join Our Community</h6>
                <div className="social-icons">
                  <a href="#" className="social-link instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href="#" className="social-link facebook">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="#" className="social-link twitter">
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>
                  <a href="#" className="social-link whatsapp">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="footer-links-container">
              <div className="footer-links-column">
                <h5 className="footer-heading">Company</h5>
                <ul className="footer-links">
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/careers">Careers</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/partners">Partners</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>

              <div className="footer-links-column">
                <h5 className="footer-heading">Support</h5>
                <ul className="footer-links">
                  <li><Link to="/help">Help Center</Link></li>
                  <li><Link to="/safety">Trust & Safety</Link></li>
                  <li><Link to="/grievances">Grievances</Link></li>
                  <li><Link to="/report">Report Issue</Link></li>
                  <li><Link to="/faq">FAQs</Link></li>
                </ul>
              </div>

              <div className="footer-links-column">
                <h5 className="footer-heading">Legal</h5>
                <ul className="footer-links">
                  <li><Link to="">Privacy Policy</Link></li>
                  <li><Link to="">Terms of Service</Link></li>
                  <li><Link to="">Cookie Policy</Link></li>
                  <li><Link to="">Fraud Alert</Link></li>
                  <li><Link to="">Accessibility</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="copyright">
              <p>&copy; {new Date().getFullYear()} PetPulse. All rights reserved.</p>
            </div>
          
          </div>
        </div>
      </div>


    </>
  )
}

export default Footer