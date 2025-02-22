import React from 'react'
import Header from '../component/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


function Home() {





  return (
    <>
   <Header/>
<div className='container mb-5'>
            <h3 className=" fw-bold text-center  text-black mt-4 ">find your services</h3>
            <button type="button" class="btn btn-primary  " style={{position:'fixed'}}>
  Messages <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">+99 <span class="visually-hidden">unread messages</span></span>
</button>

       <div className=' d-flex align-items-center justify-content-center'>
        <div className='position-relative d-flex  mt-3 border border-1 rounded-pill w-50'>
                <input type="text" placeholder='Search Here' className='py-2 px-3 w-100 form-control border rounded-pill search' style={{ border: 'none',backgroundColor:'transparent' }} />
                 <FontAwesomeIcon icon={faSearch} className='position-absolute top-50 text-black end-0 translate-middle-y me-3 ' />
              </div>
              
       </div>



        <div className="row mt-5">
          <div className="col-md-4">
            <div className='position-relative   rounded-3 p-3 card-hover'>
              <img src="/pet-taxi.png" alt="" width={'50px'} height={'50px'} className='position-absolute top-0 start-50 translate-middle  rounded-circle border bg-black p-2' />
             <div className='d-flex align-items-center justify-content-center flex-column '>
                <h3 className='text-center text-black fw-bold mt-4'>Pet Taxi</h3>
                <p className='text-black fw-blod'> Our Pet Taxi service offers safe and reliable transportation for your pets, whether it’s a trip to the vet, groomer, or any other destination. </p>
                <Link to={'/book'}><a  className="btn  text-white btn-sm px-5  rounded-pill shadow-sm" style={{ backgroundColor: 'rgba(26, 119, 104)', borderColor: '#1a7768' }}>₹1000</a></Link>
             </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className='position-relative  rounded-3 p-3 card-hover'>
              <img src="/dog-walking.png" alt="" width={'50px'} height={'50px'} className='position-absolute top-0 start-50 translate-middle rounded-circle border bg-black p-2' />
             <div className='d-flex align-items-center justify-content-center flex-column '>
                <h3 className='text-center text-black fw-bold mt-4'>Pet walking</h3>
                <p className='text-black fw-blod  '> Give your pet the exercise and fresh air they need with our Pet Walking service. At PetPulse, our experienced walkers provide personalized attention and care </p>
                <Link to={'/book'}><a  className="btn  text-white btn-sm px-5  rounded-pill shadow-sm" style={{ backgroundColor: 'rgba(26, 119, 104)', borderColor: '#1a7768' }}>₹3000</a></Link>
             </div>
            </div>
  
          </div>
          <div className="col-md-4">
          <div className='position-relative  rounded-3 p-3 card-hover'>
              <img src="/pet-grooming.png" alt="" width={'50px'} height={'50px'} className='position-absolute top-0 start-50 translate-middle  rounded-circle border  bg-black p-2' />
             <div className='d-flex align-items-center justify-content-center flex-column '>
                <h3 className='text-center text-black fw-bold mt-4'>Pet Grooming</h3>
                <p className='text-black fw-blod '> Keep your pets looking and feeling their best with our Pet Grooming service. At PetPulse, we offer a full range of grooming options tailored to your pet's . </p>
                <Link to={'/book'}><a  className="btn  text-white btn-sm px-5  rounded-pill shadow-sm" style={{ backgroundColor: 'rgba(26, 119, 104)', borderColor: '#1a7768' }}>₹2000</a></Link>
             </div>
            </div>
  
          </div>
        </div>
  
        <div className="row mt-5">
          <div className="col-md-4">
            <div className='position-relative rounded-3 p-3 card-hover'>
              <img src="/pet-boarding.png" alt="" width={'50px'} height={'50px'} className='position-absolute top-0 start-50 translate-middle  rounded-circle border bg-black p-2' />
             <div className='d-flex align-items-center justify-content-center flex-column '>
                <h3 className='text-center text-black fw-bold mt-4'>Pet Day Care</h3>
                <p className='text-black fw-blod'> Ensure your pet has a fun-filled day with our Pet Day Care service. At PetPulse, we provide a safe and engaging environment where your pet can play. </p>
                <Link to={'/book'}><a  className="btn  text-white btn-sm px-5  rounded-pill shadow-sm" style={{ backgroundColor: 'rgba(26, 119, 104)', borderColor: '#1a7768' }}>₹2000</a></Link>
             </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className='position-relative  rounded-3 p-3 card-hover'>
              <img src="/training.png" alt="" width={'50px'} height={'50px'} className='position-absolute top-0 start-50 translate-middle rounded-circle border bg-black p-2' />
             <div className='d-flex align-items-center justify-content-center flex-column '>
                <h3 className='text-center text-black fw-bold mt-4'>Pet training</h3>
                <p className='text-black fw-blod'> At PetPulse, our professional trainers use positive reinforcement techniques to teach your pet essential skills and good behavior </p>
                <Link to={'/book'}><a  className="btn  text-white btn-sm px-5  rounded-pill shadow-sm" style={{ backgroundColor: 'rgba(26, 119, 104)', borderColor: '#1a7768' }}>₹3000</a></Link>
             </div>
            </div>
  
          </div>
          <div className="col-md-4  ">
          <div className='position-relative  rounded-3 p-3 card-hover '>
              <img src="/sitting.png" alt="" width={'50px'} height={'50px'} className='position-absolute top-0 start-50 translate-middle  rounded-circle border  bg-black p-2' />
             <div className='d-flex align-items-center justify-content-center flex-column '>
                <h3 className='text-center text-black fw-bold mt-4'>Pet sitting</h3>
                <p className='text-black fw-blod '> Give your pet the comfort of home while you're away with our Pet Sitting service. At PetPulse, our experienced sitters provide personalized care  </p>
                <Link to={'/book'}><a  className="btn  text-white btn-sm px-5  rounded-pill shadow-sm" style={{ backgroundColor: 'rgba(26, 119, 104)', borderColor: '#1a7768' }}>₹1000</a></Link>
             </div>
            </div>
  
          </div>
        </div>
  
</div>

    </> 

    
  )
}

export default Home