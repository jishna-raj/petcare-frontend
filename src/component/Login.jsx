import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { loginApi } from '../services/allApi'
import Header from './Header'

function Login() {

  const navigate = useNavigate()
  // const[existingUser,setExistingUser]=useState({})
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const login = async () => {
    let { email, password } = user
    email = email.trim();
    password = password.trim();

    if (!email || !password) {
      Swal.fire({
        title: 'Empty',
        text: 'Please fill the form properly',
        icon: 'error'
      })
    } 
   
    else{
      try {
        const result = await loginApi({ email, password })
        
            console.log(result);
            
         if (result.status === 200) {

          if(result.data.existingUser.email==='admin@gmail.com' && result.data.existingUser.password ==='admin123'){
            sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
            sessionStorage.setItem("token", result.data.token)
            Swal.fire({
              title: 'Wow',
              text: 'Login successful',
              icon: 'success'
            })
            setUser({
              email: "",
              password: ""
            })
            navigate('/admin')  
          }else{

            sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token", result.data.token)
          navigate('/home')
          } 
          
        } 
        else {
          Swal.fire({
            title: 'Error',
            text:  'Something went wrong',
            icon: 'error'
          })
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Unable to login. Please try again later.',
          icon: 'error'
        })
        console.error('Login Error:', error)
      }


    }

  
    }
    
  

  return (
    <>
    <Header/>
      <div className='w-100'>
        <div className="row w-100 py-5 mt-1">
          <div className="col-md-3"></div>
          <div className="col-md-6 p-3 d-flex align-items-center justify-content-center">
            <div className='px-4 py-4 border border-black shadow-lg login' style={{ borderRadius: '50px 10px', width: '310px' }}>
              <h4 className='text-black fw-bold text-center'>Login</h4>

              <div className='position-relative d-flex mt-3' style={{ borderBottom: '2px solid black' }}>
                <input
                  type="text"
                  placeholder='Email id'
                  className='py-2 px-3 w-100'
                  style={{ border: 'none', backgroundColor: 'transparent' }}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <FontAwesomeIcon icon={faUser} className='position-absolute top-50 text-black end-0 translate-middle-y me-3' />
              </div>

              <div className='position-relative d-flex mt-4' style={{ borderBottom: '2px solid black' }}>
                <input
                  type="password"
                  placeholder='Password'
                  className='py-2 px-3 w-100'
                  style={{ border: 'none', backgroundColor: 'transparent' }}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <FontAwesomeIcon icon={faLock} className='position-absolute top-50 text-black end-0 translate-middle-y me-3' />
              </div>

              <button className='btn btn-sm text-white bg-black w-75 form-control rounded-pill mt-4 ms-4' onClick={login}>Login</button>
              <p className='text-center text-black mt-1'>Are you a new user? <Link to={'/register'} style={{ textDecoration: 'none', color: 'black' }}>Sign up</Link></p>

            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  )
}

export default Login
