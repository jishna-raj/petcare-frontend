import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import {  getBookingApi } from '../services/allApi'
import { addBookingResponseContext } from '../context/Contextshare'


function Userdetails() {
  
const [userbooking,setUserBooking]=useState([])

const {addResponse}=useContext(addBookingResponseContext)

  const getBooking =async()=>{
    const token =sessionStorage.getItem("token")
console.log(token);

    const reqHeader = {
      "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
    }
    const result =await getBookingApi(reqHeader)
    setUserBooking(result.data)
    
   console.log(result);
   
    
    
    
  }

  useEffect(()=>{
     getBooking()
  },[addResponse])
  

  

  return (
    <>

<div className="col-md-8 bg-white shadow-sm rounded p-4">
      <h3 className="text-center fw-bold mb-4">Booking History</h3>

      {/* Booking History Item */}
      {userbooking?.length>0 ?
      userbooking.map((item)=>(<div className="border-top border-bottom py-3 d-flex justify-content-between align-items-center">
        <div><strong>Service:</strong> {item.service}</div>
        <div><strong>Date:</strong> {item.date}</div>
        <div><strong>Pets:</strong> {item.petsCount}</div>
        <div><strong>Type:</strong> {item.petType}</div>
      </div>)):
      <p>no booking available</p>
      }
  

    </div>

    </>
  )
}

export default Userdetails