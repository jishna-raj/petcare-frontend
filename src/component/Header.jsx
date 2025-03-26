import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'



function Header() {
  const [token,settToken] =useState("")

  const logout =async()=>{
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem('token')
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token"))
      settToken(sessionStorage.getItem("token"))
  },[])

  
  return (
    <div className='container-fluid p-1  shadow-sm'>
    <Navbar expand="lg" className='nav'>
  <Container>
    <Navbar.Brand href="#home"> 
        <div className='d-flex'>
            <img src={logo} className='' width={'40px'} height={'40px'} alt=""  />
                <h3  className='text-black fw-bolder mt-2 ms-1'>TheVelvetPaw</h3>
        </div>
        </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">

     { !token?<Nav className="ms-auto ">
       <Link style={{textDecoration:'none'}}> <Nav.Link  className='text-black'>Home</Nav.Link></Link>
        <Link to={'/login'} style={{textDecoration:'none'}}><Nav.Link href="#link" className='text-black'>Login</Nav.Link></Link>
       <Link to={'/register'} style={{textDecoration:'none'}}> <Nav.Link href="#Auth"  className='text-black'>Register</Nav.Link></Link>

      <div className='ms-5'>
         <Link to={'/adoption'} style={{textDecoration:'none'}}> <button className='btn btn-outline-success ms-5'>Get a Pet</button></Link>
         <Link to={'/groomer-reg'} style={{textDecoration:'none'}}> <button className='btn btn-outline-danger ms-3'>groomer</button></Link>
      </div>



      </Nav>

:
      <Nav className="ms-auto ">
       <Link to={'/userprofile'} style={{textDecoration:'none'}}><Nav.Link href="#link" className='text-black'>Profile</Nav.Link></Link>
       <Link to={'/home'} style={{textDecoration:'none'}}><Nav.Link href="#link" className='text-black'>Book now</Nav.Link></Link>

       <Link to={'/'} style={{textDecoration:'none'}}> <Nav.Link href="#Auth"  className='text-black' onClick={logout}>Logout</Nav.Link></Link>


      </Nav>}

    </Navbar.Collapse>
  </Container>
</Navbar>  

</div>   

  )
}

export default Header