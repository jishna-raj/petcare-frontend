import { faAddressBook, faBell, faMapPin, faMessage, faUser, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import Userdetails from '../component/Userdetails';
import Editprofile from '../component/Editprofile';
import { getMessageApi, userdataApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';
import { editResponseContext, messageSentResponseContext } from '../context/Contextshare';
import Header from '../component/Header';

function Userprofile() {
  const [user, setUser] = useState([]);
  const [message,setMessage]=useState([])
const {editResponse}=useContext(editResponseContext)
const {messageSent}=useContext(messageSentResponseContext)

  const getUser =async()=>{
    const token =sessionStorage.getItem("token")
console.log(token);

    const reqHeader = {
      "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
    }
    const result =await userdataApi(reqHeader)
    setUser(result.data)
    
   console.log(result);
   
  }

  //message

  const getmessage =async()=>{
    const token =sessionStorage.getItem("token")
console.log(token);

    const reqHeader = {
      "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
    }
    const result =await getMessageApi(reqHeader)
    
    
    setMessage(result.data)
    
   console.log(result);
   
  }


  
  
useEffect(() => {
  getUser()
  getmessage()
}, [editResponse,messageSent]);





  return (
    <>
   <Header/>

   <div className="border cover" style={{ height: "250px", position: "relative" }}>
  <img src={`${serverUrl}/uploads/${user?.img}`} alt="Circle" className="circle-image" />
</div>
<div className='pt-2 border p-4'>
  <div className="row">
    <div className="col-md-4"></div>
    <div className="col-md-4  ">
      <h2 className='fw-bold text-black ms-4'> {user.username}</h2>
      <small className='fw-bolder'> <FontAwesomeIcon icon={faMessage}  className='fa-sm me-3' />
      {user.email}</small> <br />
      {user.mobile &&(<small>  <FontAwesomeIcon icon={faAddressBook} className='fa-sm me-3' />{user.mobile}</small>)} <br/>
      {user.place&&(<small><FontAwesomeIcon icon={faMapPin} className='fa-sm me-3' />{user.place}</small>)}

    </div>
    <div className="col-md-4">
    <Editprofile />

    </div>



  </div>

</div>

{/* notification and and booking history */}
<div className="container py-5">
  <div className="row w-100">
    {/* Notification Section */}
    <div className="col-md-4 d-flex align-items-center justify-content-center border bg-light shadow p-3">
      <div>
        <h5 className="text-center fw-blod mb-4">Booking Notifications</h5>
        <ol className="pl-3">
          {message?.length>0 ?
          message.map((item)=>(<li className="mb-3">Thank you for booking pet care! <br /><strong>Date:</strong> {item.date} <br /><strong>Contact us:</strong> 9946901506</li>)):
          <p>no notification yet</p>
        }
         
        </ol>
      </div>
    </div>

    {/* Booking History Section */}

    <Userdetails/>
  </div>
</div>















{/* .......................................................... */}

 </>
  );
}

export default Userprofile;
