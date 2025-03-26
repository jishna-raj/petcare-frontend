import React, { useState, useEffect } from 'react';
import './GroomerReg.css'; // Ensure this CSS file is created
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { groomerRegistrationApi } from '../../services/allApi'; // Import the API function

function GroomerReg() {
    // State to manage form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        services: [],
        phone: '',
        address: '',
        license:'',
        experience: 0,
        certification: '',
        bio: '',
        profilePicture: null,
    });

    const [preview, setPreview] = useState('');
    const [key, setKey] = useState(false);
    const navigate = useNavigate()

    // Handle file upload for profile picture
    useEffect(() => {
        if (formData.profilePicture) {
            setPreview(URL.createObjectURL(formData.profilePicture));
        }
    }, [formData.profilePicture]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
            // Handle services checkboxes
            const updatedServices = checked
                ? [...formData.services, value]
                : formData.services.filter((service) => service !== value);

            setFormData({ ...formData, services: updatedServices });
        } else if (type === 'file') {
            // Handle file upload
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create FormData for file upload
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === 'services') {
                    // Append each service individually
                    formData.services.forEach((service) => {
                        data.append('services', service);
                    });
                } else {
                    data.append(key, formData[key]);
                }
            });

            // Send POST request to the backend
            const reqHeaders = {
                'Content-Type': 'multipart/form-data',
            };

            const response = await groomerRegistrationApi(data, reqHeaders);

            if (response.status >= 200 && response.status < 300) {
                toast.success(response.data.message); // Show success message
                // Reset form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    services: [],
                    phone: '',
                    address: '',
                    experience: 0,
                    certification: '',
                    license:'',
                    bio: '',
                    profilePicture: null,
                });
                setPreview('');

                navigate('/groomer-log')

            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error('Error registering groomer:', error);
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <>
            <div className="background-container">
                <div className="form-container">
                    <form className="registration-form" onSubmit={handleSubmit} encType="multipart/form-data">
                        <h2>Groomer Registration</h2>

                        <div className="form-columns">
                            {/* Left Column */}
                            <div className="form-column">
                                <div className="form-section">
                                    <h3>Personal Information</h3>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password (min 6 characters)"
                                        value={formData.password}
                                        onChange={handleChange}
                                        minLength="6"
                                        required
                                    />
                                </div>

                                <div className="form-section">
                                    <h3>Contact Information</h3>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                    <textarea
                                        name="address"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        maxLength="200"
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="form-column">
                                <div className="form-section">
                                    <h3>Services Offered</h3>
                                    <div className="services-grid">
                                        {['Pet Taxi', 'Pet Grooming', 'Pet Training', 'Pet Sitting', 'Pet Daycare', 'Pet Walking'].map(
                                            (service) => (
                                                <label key={service}>
                                                    <input
                                                        type="checkbox"
                                                        name="services"
                                                        value={service}
                                                        checked={formData.services.includes(service)}
                                                        onChange={handleChange}
                                                    />
                                                    {service}
                                                </label>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3>Professional Details</h3>

                                    <input
                                        type="text"
                                        name="license"
                                        placeholder="license"
                                        value={formData.license}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="number"
                                        name="experience"
                                        placeholder="Years of Experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                    <input
                                        type="text"
                                        name="certification"
                                        placeholder="Certifications (comma separated)"
                                        value={formData.certification}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-section">
                                    <h3>Additional Information</h3>
                                    <textarea
                                        name="bio"
                                        placeholder="Bio (max 500 characters)"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        maxLength="500"
                                    ></textarea>
                                    <div className="input-box">
                                        <label>Profile Picture:</label>
                                        <label className="file-input-label">
                                            <span className="file-input-text">Choose a Picture</span>
                                            <input
                                                className="file-input"
                                                type="file"
                                                name="profilePicture"
                                                onChange={handleChange}
                                                key={key}
                                                required
                                            />
                                        </label>
                                        {preview && <img src={preview} alt="Profile Preview" className="preview-image " height={"200px"} width={"200px"} />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center flex-column w-100">
                            <button type="submit" className="submit-btn mb-3 w-50">
                                Register
                            </button>
                            <span>
                                Already registered?{' '}
                                <Link
                                    style={{ textDecoration: 'none', color: 'green', fontWeight: '600' }}
                                    to={'/groomer-log'}
                                >
                                    Please login
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer autoClose={2000} theme="colored" position="top-center" />
        </>
    );
}

export default GroomerReg;