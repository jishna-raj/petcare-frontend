import React from 'react'
import About from '../component/About'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


function Landing() {
  return (
    <>
       <div style={{backgroundImage:'url(bk2.jpg)',width:'100%', height:'100vh',backgroundSize:'cover', backgroundPosition:'center', borderRadius:'0px 0px 10px 10px'}}>
        
        {/* nav bar */}
<div className='container p-3'>
            <Navbar expand="lg" className='nav'>
          <Container>
            <Navbar.Brand href="#home"> 
                <div className='d-flex'>
                    <img src="animal1.png" className='' width={'40px'} height={'40px'} alt=""  />
                        <h3  className='text-white fw-bolder mt-2 ms-1'>Petpulse</h3>
                </div>
                </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto ">
              <Link to={'/home'} style={{textDecoration:'none'}}><Nav.Link href="#link" className='text-white'>Home</Nav.Link></Link>
              <Link to={'/login'} style={{textDecoration:'none'}}><Nav.Link href="#link" className='text-white'>Login</Nav.Link></Link>
               <Link to={'/register'} style={{textDecoration:'none'}}> <Nav.Link href="#Auth"  className='text-white'>Register</Nav.Link></Link>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>  
    
</div>   
<div className='container d-flex align-items-center justiy-content-center'style={{ minHeight: '50vh' }}>
  <div className="row w-100">
            <div className="col-md-6  py-5">
              <div>
                <h1 className='fw-bold heading text-white'>Care for your friend</h1>
                <div className='d-flex'>
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
       <div className='mt-5'>
        <About/>
       </div>
  

    </>
  )
}

export default Landing