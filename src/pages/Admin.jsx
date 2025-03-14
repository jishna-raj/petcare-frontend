import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Header from '../component/Header';
import Addemployee from '../component/Addemployee';
import { getAllBookingApi, getEmployeeApi, postMessageApi, removeEmployeeApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';
import { addEmployeeResponseContext, messageSentResponseContext } from '../context/Contextshare';
import Userforadmin from '../component/Userforadmin';
import Swal from 'sweetalert2';


function Admin() {

const [booking,setBooking]=useState([])
const [employee,setEmployee]=useState([])
const {addEmployee}=useContext(addEmployeeResponseContext)
const {setMessagesent}=useContext(messageSentResponseContext)
const navigate = useNavigate()

  const getEmployee =async()=>{
    const token =sessionStorage.getItem("token")
console.log(token);

    const reqHeader = {
      "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
    }
    const result =await getEmployeeApi(reqHeader)

    console.log(result);
    
    setEmployee(result.data)
   
  }


  const logout =async()=>{
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem('token')
    navigate('/')
    
  }


  //delete

  const removeEmployee=async(id)=>{
    const result =await removeEmployeeApi(id)
    if (result.status==200) {
      getEmployee()
      Swal.fire({
        title: 'Deleted',
        text: 'Deleted successfully',
        icon: 'error'
      })
    }
  }
//get booking details

  const getbooking=async()=>{
   
    const result =await getAllBookingApi()
    console.log(result);
    setBooking(result.data)
    
  }

  

  const handleMessage=async(userId,service,date)=>{

    const reqBody = {
      userId,   
      service,  
      date      
    };
    const result =await postMessageApi(reqBody)
    console.log(result);
    if (result.status==200) {
      setMessagesent(result.data)
      Swal.fire({
        title: 'Wow',
        text: 'Message sent',
        icon: 'success'
      })
    }
    
  }

  useEffect(()=>{
    getEmployee()
    getbooking()

  },[addEmployee])




  return (
    <>
    
      <div className="container-fluid  min-vh-100">
        {/* Navbar */}
        <Navbar expand="lg" className="bg-white shadow-sm">
          <Container>
            <Navbar.Brand>
              <div className='d-flex align-items-center'>
                <img src="animal1.png" alt="Petpulse Logo" width="30px" height="30px" />
                <h3 className='text-dark fw-bold ms-2'>PetPulse</h3>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Link to={'/'} className='text-dark fw-bold me-4' style={{textDecoration:'none'}}><button className='btn text-dark fw-bold'>Home</button></Link>
                <button className='btn text-dark fw-bold' style={{textDecoration:'none'}}  onClick={logout}>Logout</button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Content */}
        <div className="container my-4">
          <div className="row">
            <div className="col-md-3 d-flex align-items-center justify-content-center">
              {/* <button className='btn btn-dark fw-bold rounded-pill px-4'>Add Employee</button> */}
              <Addemployee/>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-center justify-content-center">
                <div className='position-relative d-flex mt-3 border border-dark rounded-pill w-75'>
                  <input 
                    type="text" 
                    placeholder='Search Employee name' 
                    className='form-control border-0 py-2 px-3 rounded-pill w-100' 
                    style={{ backgroundColor: 'transparent' }} 
                  />
                  <FontAwesomeIcon 
                    icon={faSearch} 
                    className='position-absolute top-50 translate-middle-y text-dark end-0 me-3' 
                  />
                </div>
              </div>
            </div>

            <div className="col-md-3"></div>
          </div>

          {/* Employee Cards */}
          <div className="row mt-4">
            
          <div className="col-md-8 d-flex flex-column mb-1">
  {employee?.length > 0 ? 
    employee.map((item) => (
      <div key={item._id} className='border border-2 p-3 rounded d-flex align-items-center w-100 bg-white shadow-sm mb-2'>
        <img src={`${serverUrl}/uploads/${item?.img}`} alt="" className='rounded-circle me-3' style={{ width: "40px", height: "40px" }} />
        <div className='flex-grow-1'>
          <h6 className='fw-bold mb-0'>{item.name}</h6>
          <small className='text-muted'>{item.designation}</small>
          <small className='text-muted ms-2'>{item.place}</small>
          <small className='text-muted ms-2'>{item.license}</small>


        </div>
        <div className='text-muted me-3'>{item.mobile}</div>
        <FontAwesomeIcon onClick={() => removeEmployee(item._id)} icon={faTrash} className='text-danger cursor-pointer' />
      </div>
    )) : 
    <p>No employees added</p>
  }
</div>

            {/* Placeholder for messages */}
            <div className="col-md-4">
  {booking?.length > 0 ? 
    booking.map((items, index) => (
      <div key={index} className="border border-2 rounded p-3 bg-white shadow-sm mb-3" style={{ maxWidth: '250px', fontSize: '12px' }}>
        <h6 className="fw-bold">Messages</h6>
        <div className="mt-2">
          {/* Compact content with horizontally aligned fields */}
          <div className="d-flex justify-content-between">
            <small><strong>Count:</strong> {items.petsCount}</small>
          </div>
          <div className="d-flex justify-content-between">
            <small><strong>Pet:</strong> {items.petType}</small>
          </div>
          <div className="d-flex justify-content-between">
            <small><strong>Service:</strong> {items.service}</small>
          </div>
          <div className="d-flex justify-content-between">
            <small><strong>Breed:</strong> {items.breed}</small>
          </div>
          <div className="d-flex justify-content-between">
            <small><strong>Instruction:</strong> {items.instruction}</small>
          </div>
          <div className="d-flex justify-content-between">
            <small><strong>Pickup:</strong> {items.pickup}</small>
          </div>
          <div className="d-flex justify-content-between">
            <small><strong>Date:</strong> {items.date}</small>
          </div>
          
          {/* Action Buttons */}
          <div className="d-flex">
            <button className="btn btn-success btn-sm me-2" onClick={() => handleMessage(items.userId, items.service, items.date)}>
              Confirm
            </button>
            <Userforadmin data={items} />
          </div>
        </div>
      </div>
    ))
    : 
    <p>No booking available</p>
  }
</div>
        
 </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
