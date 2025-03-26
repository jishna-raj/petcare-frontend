import React, { useEffect, useState } from 'react'
import { addGroomerTestimonialApi, userdataApi } from '../../services/allApi';
import { useNavigate } from 'react-router-dom';



function GroomerReview() {
    const [userDetails, setUserDetails] = useState(null);
    const [formData, setFormData] = useState({ review: '' });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [testimonials, setTestimonials] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("token")
                const sessionUser = sessionStorage.getItem('existingUser');
                if (sessionUser) {
                    const parsedUser = JSON.parse(sessionUser);
                   console.log(parsedUser);
                   
                    
                    const reqHeader = {
                        
                        "Authorization": `Bearer ${token}`

                    };
                    
                    const userResponse = await userdataApi(reqHeader);
                    console.log(userResponse);
    
                    if (userResponse.status >= 200 && userResponse.status < 300) {
                        setUserDetails(userResponse.data);
                    }
                }
            } catch (err) {
                setError('Failed to load user data');
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

            const addResponse = await addGroomerTestimonialApi(testimonialData);

            if (addResponse.status >= 200 && addResponse.status < 300) {
             
                setFormData({ review: '' });

                Swal.fire({
                    title: 'wow....',
                    text: 'Review submitted successfully!',
                    icon: 'success'
                })

                navigate('/userprofile')

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


    return (
        <>

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




        </>
    )
}

export default GroomerReview