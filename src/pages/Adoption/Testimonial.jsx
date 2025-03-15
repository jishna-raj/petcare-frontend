import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllTestimonialsApi, addTestimonialApi, getAadoptionUseridApi } from '../../services/allApi';
import './testi.css';
import { serverUrl } from '../../services/serverUrl';
import Swal from 'sweetalert2';

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({ review: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch testimonials and user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch testimonials
        const { data } = await getAllTestimonialsApi();
        if (data.success) setTestimonials(data.data);

        // Check session storage for user
        const sessionUser = sessionStorage.getItem('adoptionUser');
        if (sessionUser) {
          const parsedUser = JSON.parse(sessionUser);
          const userResponse = await getAadoptionUseridApi(parsedUser._id);
          console.log(userResponse);
          
          if (userResponse.status>=200 && userResponse.status<300){
            setUserDetails(userResponse.data);
          } 
        }
      } catch (err) {
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!formData.review.trim()) {
      setError('Please write a review before submitting');
      setSubmitting(false);
      return;
    }

    try {
      const testimonialData = {
        user: userDetails.username,
        review: formData.review.trim(),
        img: userDetails.img || ''
      };

      const addResponse = await addTestimonialApi(testimonialData);
      
      if (addResponse.status>=200 && addResponse.status<300) {
        // Refresh testimonials list
        const { data: newData } = await getAllTestimonialsApi();
        setTestimonials(newData.data);
        setFormData({ review: '' });

         Swal.fire({
             title:'wow....',
             text:'Review submitted successfully!',
             icon:'success'
           })
     
      } else {
        setError(data.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.response?.data?.message || 'Failed to submit testimonial');
    } finally {
      setSubmitting(false);
    }
  };


  console.log(testimonials);
  

  // Carousel settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  if (loading) return <div className="text-center py-5">Loading testimonials...</div>;
  if (error) return <div className="text-center text-danger py-5">Error: {error}</div>;

  return (
    <div className="container1">
      <h2 className="mt-5 text-success text-center">Customer Reviews & Testimonials</h2>

      <div className="reviews p-5">
        <div className="slider-container">
          {testimonials.length > 0 ? (
            <Slider {...settings}>
              {testimonials.map((testimonial) => (
                <div className="review" key={testimonial._id}>
                  <img 
                    src={`${serverUrl}/uploads/${testimonial.img}`} 
                    alt={testimonial.user} 
                    className="review-img"
                  />
                  <div className="review-content">
                    <h3>{testimonial.user}</h3>
                    <p>"{testimonial.review}"</p>
                    <small>
                      Posted on: {new Date(testimonial.postedAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center">No testimonials yet. Be the first to share your experience!</p>
          )}
        </div>
      </div>

      {userDetails ? (
        <div className="add-review mb-5">
          <h3 className="text-center">Add Your Review</h3>
          <form onSubmit={handleSubmit} className="mb-5 form3 shadow">
            <textarea
              className="textarea form-control"
              rows="4"
              placeholder="Write your review..."
              value={formData.review}
              onChange={(e) => setFormData({ review: e.target.value })}
              disabled={submitting}
              maxLength="500"
            />
            <div className="text-end mt-2">
              <small>{formData.review.length}/500 characters</small>
            </div>
            <div className="text-center mt-3">
              <button 
                type="submit" 
                className="btn btn-success"
                disabled={submitting || !formData.review.trim()}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Review'
                )}
              </button>
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        </div>
      ) : (
        <div className="text-center mb-5">
          <p className="text-muted">Please log in to submit your testimonial</p>
        </div>
      )}
    </div>
  );
}

export default Testimonial;