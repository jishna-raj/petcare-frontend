import React from 'react'
import './testimonial.css'
function Testimonial() {
  return (
   <>
   <div className="container-fluid">
      <h2 className='mt-5 text-success'>Customer Reviews & Testimonials</h2>

      <div className="reviews p-5">
       <div className='row p-5'>
           <div className='col-md-4'>
                <div className="review">
                  <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
                  <div className="review-content">
                    <h3>John Doe</h3>
                    <p>"Amazing service! Highly recommend it."</p>
                    <small>Posted on: 2025-03-13</small>
                  </div>
                </div>
           </div>
            <div className='col-md-4'>
                <div className="review">
                  <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="User" />
                  <div className="review-content">
                    <h3>Jane Smith</h3>
                    <p>"A great experience, will come back again."</p>
                    <small>Posted on: 2025-03-12</small>
                  </div>
                </div>
            </div>

            <div className='col-md-4'>
                <div className="review">
                  <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
                  <div className="review-content">
                    <h3>John Doe</h3>
                    <p>"Amazing service! Highly recommend it."</p>
                    <small>Posted on: 2025-03-13</small>
                  </div>
                </div>
           </div>
          
       </div>
      </div>

      <div className="add-review mb-5">
        <h3 className='text-center'>Add Your Review</h3>
        <form className='mb-5  '>
          <input type="text" placeholder="Your Name" />
          <textarea rows="4" placeholder="Write your review..."></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>

     
    </div>
   
   
   
   </>
  )
}

export default Testimonial