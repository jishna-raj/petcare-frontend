import { faMagnifyingGlass,faMessage,faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'




function About() {

  return (
    <>
     <div className="container  py-4 rounded-3 " >
      {/* about section */}
      <div className="row w-100 pt-2">
        
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div >
            <img src="bk.jpg" alt="" width={'100%'} height={'260px'} className='rounded-3' style={{borderRadius:'20%'}} />
          </div>
        </div>
        <div className="col-lg-6 text-center text-lg-start d-flex align-items-center justify-content-center">
     <div>
        <h2 className=" fw-bold"  style={{color:'rgba(26, 119, 104)'}}>About Us</h2>
        <p className="text-muted lead mb-4">
          At <span className="fw-bold" style={{color:'rgba(26, 119, 104)'}}>TheVelvetPaw</span>, our mission is to provide exceptional pet care services that enrich the lives of your beloved pets. We believe in creating a deep bond of trust and understanding with both pets and their owners, ensuring that every pet receives the love and attention they deserve.
        </p>
        <a href="/services" className="btn  text-white btn-lg px-5 rounded-pill shadow-sm" style={{ backgroundColor: 'rgba(26, 119, 104)', borderColor: '#1a7768' }}>Learn More</a>
    </div>
    </div>
  
      </div>
    
     {/* our services  */}
     <h2 className=" fw-bold text-center"  style={{color:'rgba(26, 119, 104)',marginTop:'70px'}}>Services for every Pets </h2>
    <div className="row mt-4">
      <div className="col-md-6 d-flex align-items-center justify-content-center p-2 flex-column">
      <div className='d-flex'>
        <img src="/pet-groomingl.png" alt="" width={'65px'} height={'75px'} />
        <div className='ms-3 mt-2'>
          <h3 className=' text-black fw-bold lead '>Pet grooming</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
      </div>

      <div className='d-flex'>
        <img src="/training.png" alt="" width={'65px'} height={'75px'} />
        <div className='ms-3 mt-2'>
          <h3 className=' text-black fw-bold lead '>Pet Training</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
      </div>

      <div className='d-flex'>
        <img src="/walking.png" alt="" width={'65px'} height={'75px'} />
        <div className='ms-3 mt-2'>
          <h3 className=' text-black fw-bold lead '>Pet Walking</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
      </div>

      <div className='d-flex'>
        <img src="sitting.png" alt="" width={'65px'} height={'75px'} />
        <div className='ms-3 mt-2'>
          <h3 className=' text-black fw-bold lead '>Pet sitting</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
      </div>

      
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-center">
      <div >
            <img src="https://media.istockphoto.com/id/1331985239/vector/people-with-pets.jpg?s=612x612&w=0&k=20&c=aK7_DFTBx5rD5IEAbU8GyJj6jcwSi5Wuef8vU_-lC88=" alt="" width={'100%'} height={'320px'}  className='rounded-3' style={{borderRadius:'20%'}} />
          </div>
      </div>

    </div>


    </div> 
         
         
         
         
         
         
         
         
          {/* how to work */}

 {/* <div className='container-fluid secn bg-light'>
  <h2 className="fw-bold text-center mt-3 pt-4" style={{ color: 'rgba(26, 119, 104)' }}>
    How PetPulse Works
  </h2>
  
  <div className="row text-center">
    <div className="col-md-4 d-flex align-items-center justify-content-center mb-4">
      <div className="px-4 py-3  hover-effect">
        <FontAwesomeIcon icon={faMagnifyingGlass} className='fa-3x mb-3' style={{ color: '#1a7768' }} />
        <h3 className="fw-bold mb-3 text-black">Search</h3>
        <p className="text-muted">Find the perfect service for your pet’s needs.</p>
      </div>
    </div>
    
    <div className="col-md-4 d-flex align-items-center justify-content-center mb-4">
      <div className="px-4 py-3  hover-effect">
        <FontAwesomeIcon icon={faMessage} className='fa-3x mb-3' style={{ color: '#1a7768' }} />
        <h3 className="fw-bold mb-3 text-black">Book</h3>
        <p className="text-muted">Schedule your appointment with ease.</p>
      </div>
    </div>
    
    <div className="col-md-4 d-flex align-items-center justify-content-center mb-4">
      <div className="px-4 py-3  hover-effect">
        <FontAwesomeIcon icon={faCartShopping} className='fa-3x mb-3' style={{ color: '#1a7768' }} />
        <h3 className="fw-bold mb-3 text-black">Relax</h3>
        <p className="text-muted">Our team will take care of the rest.</p>
      </div>
    </div>
  </div>

</div>
 */}

    </>
  )
}

export default About