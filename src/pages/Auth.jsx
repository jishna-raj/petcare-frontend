import React from 'react'
import Register from '../component/Register'
import Login from '../component/Login'
import Header from '../component/Header'
import Footer from '../component/Footer'

function Auth({register}) {
  return (
    <div className='login' >
         

      {register?<Register/>
      :<Login/>}
      
    </div>

  )
  

}

export default Auth