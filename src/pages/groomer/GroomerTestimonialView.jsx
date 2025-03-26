import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { getGroomerTestimonialApi } from '../../services/allApi';
import { format } from 'date-fns';
import { Pagination } from 'react-bootstrap';
import { serverUrl } from '../../services/serverUrl';

function GroomerTestimonialView() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await getGroomerTestimonialApi();
                if (response.data && response.data.data) {
                    setTestimonials(response.data.data);
                } else {
                    setError('No testimonials found');
                }
            } catch (err) {
                console.error('Error fetching testimonials:', err);
                setError('Failed to load testimonials');
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading testimonials...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-5">{error}</div>;
    }

    return (
        <div className="containerdiv" style={{ padding: "50px" }}>
            <div className="testimonials-title-container">
                <h1 className="testimonials-title">Client Success Stories</h1>
                <p className="testimonials-subtitle">
                    Discover how our solutions have helped businesses across industries achieve their goals and overcome challenges.
                </p>
            </div>

            <div className="row">
                {testimonials.length > 0 ? (
                    testimonials.map((testimonial) => (
                        <div key={testimonial._id} className="col-md-3 mb-4">
                            <Card className="testimonial-card h-100" style={{ width: '100%' }}>
                                <Card.Img
                                    variant="top"
                                    src={`${serverUrl}/uploads/${testimonial.img}`}
                                    style={{ height: '100px', objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{testimonial.user}</Card.Title>
                                    <Card.Text className="flex-grow-1">
                                        {testimonial.review}
                                    </Card.Text>
                                    <div className="mt-auto">
                                        <small className="text-muted">
                                            Posted on: {format(new Date(testimonial.postedAt), 'MMM dd, yyyy')}
                                        </small>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No testimonials available yet.</p>
                    </div>
                )}

                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev />
                        <Pagination.Item active>{1}</Pagination.Item>
                        <Pagination.Next />
                    </Pagination>
                </div>
            </div>
        </div>
    );
}

export default GroomerTestimonialView;