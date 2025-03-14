import React from 'react'
import './contact.css'

function Contact() {
  return (
   <>
   
   <div className="contact-section">
  <div className="contact-content">
    <div className="contact-info">
      <h2 className="contact-title">Let's get in touch</h2>
      
      <div className="contact-links">
        <div className="contact-item">
          <div className="icon-container">
            <i className="fa fa-envelope"></i>
          </div>
          <div className="link-container">
            <span className="link-label">Email</span>
            <a className="contact-link" href="">
              admin@gmail.com
            </a>
          </div>
        </div>
        
        <div className="contact-item">
          <div className="icon-container">
            <i className="fa fa-linkedin"></i>
          </div>
          <div className="link-container">
            <span className="link-label">LinkedIn</span>
            <a className="contact-link" href="">
              User Name: admin
            </a>
          </div>
        </div>
        
        <div className="contact-item">
          <div className="icon-container">
            <i className="fa fa-github"></i>
          </div>
          <div className="link-container">
            <span className="link-label">GitHub</span>
            <a className="contact-link" href="">
              admin
            </a>
          </div>
        </div>
        
        <div className="contact-item">
          <div className="icon-container">
            <i className="fa fa-instagram"></i>
          </div>
          <div className="link-container">
            <span className="link-label">Instagram</span>
            <a className="contact-link" href="">
             @admin
            </a>
          </div>
        </div>
        
        <div className="contact-item">
          <div className="icon-container">
            <i className="fa fa-phone"></i>
          </div>
          <div className="link-container">
            <span className="link-label">Phone</span>
            <a className="contact-link" href="tel:+923019583959">
              +92 301 9583959
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <div className="profile-image">
      <div className="image-container">
        <img src="https://st2.depositphotos.com/1072614/7503/i/950/depositphotos_75038771-stock-photo-cat-talking-on-the-phone.jpg" alt="Profile" />
      </div>
    </div>
  </div>
</div>
   
   
   </>
  )
}

export default Contact