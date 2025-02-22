import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Footer from './component/Footer'
import Userprofile from './pages/Userprofile'
import Admin from './pages/Admin'
import Bookingforms from './pages/Bookingforms'
import Header from './component/Header'
import Adminemail from './pages/Adminemail'

function App() {

  return (
    <>
  
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/login' element={<Auth />}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/userprofile' element={<Userprofile/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/book' element={<Bookingforms/>}/>
      <Route path='/message' element={<Adminemail/>}/>


    </Routes>
    <Footer/>

    </>
  )
}

export default App
