import React, { useState } from 'react'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../services/allApi'
import Swal from 'sweetalert2'
import Header from './Header'


function Register() {

  const navigate=useNavigate()

   const [user, setUser]=useState({
     username:"",
     email:"",
     password:""
   })

   const register =async()=>{
     const result =await  registerApi(user)
     console.log(result);
     if (result.status==200) {
      Swal.fire({
        title:'wow',
        text:'Registration successfully',
        icon:'success'
      })
      navigate('/login')
     } else {
      Swal.fire({
        title:'Oops',
        text:'something went wrong',
        icon:'error'
      })
      setUser({
        username:"",
        email:"",
        password:""
      })

     }
     
   }
  
   

  return (
    <div >
      <Header/>
          <div className='w-100'>
          <div className="row  w-100 py-5 mt-1">
            <div className="col-md-3"></div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className='p-4 border border-3 border-black shadow-lg login'style={{borderRadius:'28px 0px',width:'310px'}} >
              <h4 className='text-black fw-bold text-center '>Register</h4>

                <div className='position-relative d-flex mt-3' style={{ borderBottom: '2px solid black'}}>
                  <input type="text" placeholder='Username' className='py-2 px-3 w-100 ' style={{ border: 'none',backgroundColor:'transparent' }} onChange={(e)=>setUser({...user,username:e.target.value})} />
                  <FontAwesomeIcon icon={faUser} className='position-absolute top-50 text-black end-0 translate-middle-y me-3' />
              </div>
              <div className='position-relative d-flex mt-3' style={{ borderBottom: '2px solid black'}}>
                  <input type="text" placeholder='Email id' className='py-2 px-3 w-100 ' style={{ border: 'none',backgroundColor:'transparent' }} onChange={(e)=>setUser({...user,email:e.target.value})} />
                  <FontAwesomeIcon icon={faEnvelope} className='position-absolute top-50 text-black end-0 translate-middle-y me-3' />
              </div>
              <div className='position-relative d-flex  mt-3' style={{ borderBottom: '2px solid black' }}>
                <input type="password" placeholder='Password' className='py-2 px-3 w-100' style={{ border: 'none',backgroundColor:'transparent' }} onChange={(e)=>setUser({...user,password:e.target.value})} />
                 <FontAwesomeIcon icon={faLock} className='position-absolute top-50 text-black end-0 translate-middle-y me-3' />
              </div>
               
              <button className=' btn btn-sm text-white bg-black  w-50 form-control rounded-pill mt-4 ms-5' type='button' onClick={register}>Sign up</button>
              <p className='text-center text-black  mt-1 '>Already a  user ? <Link to={'/login'} style={{textDecoration:'none',color:'black'}}>Login</Link></p>
              

              </div>
            </div>
            <div className="col-md-3">
            </div>
          </div>
    </div>


    </div>
  )
}

export default Register