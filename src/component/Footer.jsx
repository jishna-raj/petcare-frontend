import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram,  faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Footer() {
  
  return (
    <>
<div className='footer pt-4 shadow-lg'>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
            <Link to={"/"} style={{textDecoration:"none"}}>
            <h4 style={{ color: 'black' }} > <img
                alt=""
                src="./animal1.png"
                width="44"
                height="48"
                className="d-inline-block "
              />{' '}PetPulse</h4>
            </Link> 
              <h4 style={{ color: 'black', fontSize: "20px", fontWeight: "normal" }}>Contact with us</h4>
              <div className='d-flex justify-content-between mt-4 me-4'>
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faXTwitter} />
                <FontAwesomeIcon icon={faWhatsapp} />
              </div>
  
            </div>
            <div className="col-md-3 text-black">
              <p>About us</p>
              <p>Career</p>
              <p>Employer home</p>
              <p>Sitemap</p>
              <p>Credits</p>
  
            </div>
            <div className="col-md-3 text-black" >
              <p>Help center</p>
              <p>Summons/Notices</p>
              <p>Grievances</p>
              <p >Report issue</p>
  
            </div>
            <div className="col-md-3 text-black">
              <p>Privacy policy</p>
              <p >Terms & conditions</p>
              <p >Fraud alert</p>
              <p>Trust & safety</p>
            </div>
            {/* <div className="col-md-4">
              <Card>
                <Card.Body>
                  <h5 style={{ color: "black" }}>Apply on the go</h5>
                  <p>Get real-time job updates on our App</p>
                  <img src="https://static.naukimg.com/s/0/0/i/new-homepage/android-app_v1.png" alt="" />
                  <img className='ms-3' src="https://static.naukimg.com/s/0/0/i/new-homepage/ios-app_v1.png" alt="" />
                </Card.Body>
              </Card>
            </div> */}
          </div>
        </div>
  
</div>    </>
  )
}

export default Footer