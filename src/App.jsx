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
import AdoptionHome from './pages/Adoption/AdoptionHome'
import AdReg from './pages/Adoption/AdReg'
import AdoptionLogin from './pages/Adoption/AdoptionLogin'
import Service from './pages/Adoption/Service'
import PetCards from './pages/Adoption/pets/PetCards'
import PetView from './pages/Adoption/pets/PetView'
import Contact from './pages/contact/Contact'
import Testimonial from './pages/Adoption/Testimonial'
import AdoptionForm from './pages/Adoption/AdoptionForm'
import Adminadoption from './pages/Adminaoption/Adminadoption'
import AdoptionRequest from './pages/Adminaoption/AdoptionRequest'



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

      <Route path='/adoption' element={<AdoptionHome/>}/>
      <Route path='/adreg' element={<AdReg/>}/>

      <Route path='/adlogin' element={<AdoptionLogin/>}/>

      <Route path='/service' element={<Service/>}/>

      <Route path='/pets' element={<PetView/>}/>

      <Route path='/contact' element={<Contact/>}/>

      <Route path='/testimonials' element={<Testimonial/>}/>

      <Route path="/adoption-Form" element={<AdoptionForm />} />

      <Route path='/adoption-request' element={<AdoptionRequest/>}/>


    </Routes>
    <Footer/>




  

    

    </>
  )
}

export default App
