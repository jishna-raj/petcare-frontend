import React, { useContext, useState } from 'react'
import Header from '../component/Header'
// import Form from 'react-bootstrap/Form';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { bookingApi } from '../services/allApi';
import { Navigate, useNavigate } from 'react-router-dom';
import { addBookingResponseContext } from '../context/Contextshare';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser';

function Bookingforms() {

  const Navigate=useNavigate()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const {setAddResponse}=useContext(addBookingResponseContext)

  

  const [booking ,setBooking]=useState({
    service: "",
    petsCount:"",
    petType:"",
    breed:"",
    petSize:"",
    instruction:"",
    pickup:"",
    date:""
    
  })

  const [amount,setAmout]=useState()

const[user,setUser]=useState()
  
  
  


  const handleSelectChange = (e) => {
    setBooking({ ...booking, service: e.target.value });
  };


  const handleShow = () => {setShow(true)

   const {service}=booking
   
   
    if (service==='pet Walking' || service==='Pet Training') {
  setAmout(3000)
}
else if (service==='Pet Grooming' || service==='Pet Day Care') {
  setAmout(2000)
}
else  {
  setAmout(1000) 
}

  };

  const existingUser= sessionStorage.getItem("existingUser")
  const parsedUser = JSON.parse(existingUser);  // Parse and use directly


console.log(parsedUser.email);



  
const  handleBook=async()=>{
    const{service,petsCount,petType,breed,petSize,instruction,pickup,date}=booking
   console.log(booking);
   
    if (!service || !petsCount || !petType || !petSize || !instruction || !pickup || !date) {
      Swal.fire({
        title: 'Empty',
        text: 'Please fill the form properly',
        icon: 'error'
      })
      console.log(booking);
      
    } else {

       const token =sessionStorage.getItem("token")
console.log(booking);
       

       if (token) {
        const reqHeader ={
            "Content-Type":"application/json",
             "Authorization":`Bearer ${token}`
        }


        const result =await bookingApi(booking,reqHeader)
        console.log(result);
        if (result.status==200) {
          setAddResponse(result.data)
          Swal.fire({
            title:'wow',
            text:'booking successfully',
            icon:'success'
          })

          emailjs.send('service_vpb0x8w', 'template_msqfgyp', {
            to_name: parsedUser?.name || 'Customer', 
            to_email: parsedUser?.email,
            from_name: 'PetPulse',
            message: `Your booking for ${service} is confirmed for ${date}. We look forward to providing excellent service to you and your pet. Best regards, The PetPulse Team`,
        }, 'fJWR5yS3Qq2xMwIPw')
        .then((response) => {
            console.log('Email successfully sent!', response);
        }, (error) => {
            console.log('Failed to send email:', error);
        });


          Navigate('/userProfile')
         } else {
          Swal.fire({
            title:'Oops',
            text:'something went wrong',
            icon:'error'
          })
       
    
         }
    
  
        
       } else {
        Swal.fire({
          title:'Oops',
          text:'something went wrong',
          icon:'error'
        })
        
       }



    }

  }


  return (
    <>
      <Header/>  
     


    <div className='container d-flex align-items-center justify-content-center mt-4'>
        <div className="row w-75">
            <h3 className=' text-center text-black fw-bold'> Give the details blow</h3>
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex align-items-center justify-content-center flex-column p-3">
            <Form.Select 
      aria-label="Select a service" 
      className='mb-3' 
      value={booking.service}  // Set the current selected value from state
      onChange={handleSelectChange} // Update state on change
    >
      <option value="">What service do you need?</option>
      <option value="Pet Taxi">Pet Taxi</option>
      <option value="Pet Walking">Pet Walking</option>
      <option value="Pet Grooming">Pet Grooming</option>
      <option value="Pet Day Care">Pet Day Care</option>
      <option value="Pet Training">Pet Training</option>
      <option value="Pet Sitting">Pet Sitting</option>
    </Form.Select>
                <input className='form-control mb-3' type="number" placeholder='How many pets do you have ?'  onChange={(e)=>setBooking({...booking,petsCount:e.target.value})} />
                <input className='form-control mb-3' type="text" placeholder='What type of pet is it ?'  onChange={(e)=>setBooking({...booking,petType:e.target.value})}  />
                <input className='form-control mb-3' type="text" placeholder='What breed is it  ? (optional)' onChange={(e)=>setBooking({...booking,breed:e.target.value})} />
                <input className='form-control mb-3' type="text" placeholder='What is the size your pet ?'  onChange={(e)=>setBooking({...booking,petSize:e.target.value})}/>
                <input className='form-control mb-3' type="text" placeholder='Anything else the worker will need to know?'  onChange={(e)=>setBooking({...booking,instruction:e.target.value})}/>
                <input className='form-control mb-3' type="text" placeholder='Do you need pick up service ?'onChange={(e)=>setBooking({...booking,pickup:e.target.value})}/>
                
  <label  className="form-label fw-bold text-black ">What date you want the service?</label>
  <input className='form-control mb-3' type="date"  onChange={(e)=>setBooking({...booking,date:e.target.value})} />

  <button className='btn btn-black  border text-white' onClick={handleShow} style={{ backgroundColor: 'rgba(26, 119, 104)'}}>Book now</button>



            </div>
            <div className="col-md-2"></div>
        </div>
    </div>


    <Modal show={show} onHide={handleClose} centered>
  <Modal.Header closeButton>
    <Modal.Title className="text-center w-100">Complete Your Payment</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Payment amount */}
    <h5 className="text-center mb-4 fw-bold">Total Amount: <strong>₹{amount}</strong></h5>

    {/* Payment Form */}
    <form>
      <div className="mb-3">
        <label htmlFor="cardName" className="form-label">Cardholder Name</label>
        <input type="text" className="form-control" id="cardName" placeholder="John Doe" required />
      </div>

      <div className="mb-3">
        <label htmlFor="cardNumber" className="form-label">Card Number</label>
        <input type="text" className="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" maxLength="16" required />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
          <input type="text" className="form-control" id="expiryDate" placeholder="MM/YY" required />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input type="text" className="form-control" id="cvv" placeholder="123" maxLength="3" required />
        </div>
      </div>

      <div className="form-check mb-3">
        <input type="checkbox" className="form-check-input" id="saveCard" />
        <label className="form-check-label" htmlFor="saveCard">Save this card for future payments</label>
      </div>
    </form>
  </Modal.Body>
  <Modal.Footer className="d-flex justify-content-between">
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="success" onClick={handleBook}>
      Pay Now ₹{amount}
    </Button>
  </Modal.Footer>
</Modal>
    
    </>
  )
}

export default Bookingforms