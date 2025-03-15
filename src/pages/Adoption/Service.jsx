import React, { useEffect, useState } from 'react';
import './sample.css';
import { Link } from 'react-router-dom';
import AdHeader from './AdHeader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addpetApi } from '../../services/allApi';


function Service() {
  const [formData, setFormData] = useState({
    name: '',
    ageYears: '',
    ageMonths: '',
    location: '',
    petType: '',
    breed: '',
    gender: '',
    size: '',
    coatType: '',
    vaccines: [],
    medicationInfo: '',
    healthNotes: '',
    justification: '',
    contactEmail: '',
    contactPhone: '',
    petimg: null,
    
  });

  const [preview, setPreview] = useState('');
  const [key, setKey] = useState(false);

  // Handle file upload for pet image
  useEffect(() => {
    if (formData.petimg) {
      setPreview(URL.createObjectURL(formData.petimg));
    }
  }, [formData.petimg]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes for vaccines
  const handleVaccineChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        vaccines: [...prev.vaccines, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        vaccines: prev.vaccines.filter((v) => v !== value),
      }));
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, petimg: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.ageYears ||
      !formData.ageMonths ||
      !formData.location ||
      !formData.petType ||
      !formData.gender ||
      !formData.contactEmail ||
      !formData.contactPhone ||
      !formData.petimg
    ) {
      toast.info('Please fill the form completely');
      return;
    }



    const userData = JSON.parse(sessionStorage.getItem('adoptionUser'));
    if (!userData) {
      toast.error('User not logged in');
      return;
    }
    const userId = userData._id;

    const updatedFormData = { ...formData, userId };
    // Prepare form data
    const formDataToSend = new FormData();
    for (const key in updatedFormData) {
      if (key === 'vaccines') { // Ensure correct spelling if necessary
        updatedFormData.vaccines.forEach((vaccine) => formDataToSend.append('vaccines', vaccine));
      } else {
        formDataToSend.append(key, updatedFormData[key]);
      }
    }

    // Get token from session storage
    const token = sessionStorage.getItem('adoptionToken');

    if (token) {
      const reqHeader = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await addpetApi(formDataToSend, reqHeader);

        console.log(response);
        
        if (response.status >= 200 && response.status<300) {
          toast.success('Pet added successfully');
          setFormData({
            name: '',
            ageYears: '',
            ageMonths: '',
            location: '',
            petType: '',
            breed: '',
            gender: '',
            size: '',
            coatType: '',
            vaccines: [],
            medicationInfo: '',
            healthNotes: '',
            justification: '',
            contactEmail: '',
            contactPhone: '',
            petimg: null,
          });
          setPreview('');
        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        toast.error('Server error');
        console.error(error);
      }
    }
  };

  // Handle form reset
  const handleClose = () => {
    setFormData({
      name: '',
      ageYears: '',
      ageMonths: '',
      location: '',
      petType: '',
      breed: '',
      gender: '',
      size: '',
      coatType: '',
      vaccines: [],
      medicationInfo: '',
      healthNotes: '',
      justification: '',
      contactEmail: '',
      contactPhone: '',
      petimg: null,
    });
    setPreview('');
    setKey((prev) => !prev);
  };

  return (
    <>
      <AdHeader />
      <div className="service-container">
        {/* Adopt Section */}
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <section className="adopt-section">
              <h2>Adopt a Pet</h2>
              <img
                src="https://static.vecteezy.com/system/resources/previews/046/885/285/non_2x/a-man-kneels-down-and-pets-a-dog-smiling-the-dog-looks-happy-and-is-wearing-a-collar-they-are-both-outside-on-a-sunny-day-with-plants-and-clouds-in-the-background-free-vector.jpg"
                alt="Happy Pet"
              />
              <p>
                Welcome to our pet adoption program! Adopting a pet is a wonderful way to bring joy and companionship into
                your life.
              </p>

              <div className="info-grid d-flex flex-column justify-content-center align-items-start">
                <div>
                  <h3>Benefits of Pet Adoption</h3>
                  <ul>
                    <li>Provide a loving home to a pet in need</li>
                    <li>Experience the unconditional love of a pet</li>
                    <li>Create lasting memories and cherished moments</li>
                  </ul>
                </div>

                <div>
                  <h3>Adoption Process</h3>
                  <ol>
                    <li>Fill out an adoption application</li>
                    <li>Meet potential pets in person</li>
                    <li>Complete the necessary paperwork</li>
                  </ol>
                </div>
              </div>

              <div className="preparation-tips">
                <h3>Preparing for Your New Pet</h3>
                <div className="d-flex flex-wrap">
                  <div className="prep-card">
                    <h4>For Dogs</h4>
                    <ul>
                      <li>Food and water bowls</li>
                      <li>Dog bed and toys</li>
                      <li>Pet-safe cleaning supplies</li>
                    </ul>
                  </div>
                  <div className="prep-card">
                    <h4>For Cats</h4>
                    <ul>
                      <li>Litter box and litter</li>
                      <li>Food and water bowls</li>
                      <li>Cat bed or cozy spot</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Link to="/pets" style={{ textDecoration: 'none' }}>
                <button className="cta-button">Find Your Perfect Pet</button>
              </Link>
            </section>
          </div>

          {/* Post Pet Section */}
          <div className="col-md-6">
            <section className="post-pet-section p-5">
              <h2>Post a Pet for Adoption</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="input-box">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-box">
                    <label>Pet Age:</label>
                    <input
                      type="text"
                      name="ageYears"
                      value={formData.ageYears}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-box">
                    <label>Location:</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-box">
                    <label>Type:</label>
                    <select
                      name="petType"
                      value={formData.petType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                    </select>
                  </div>

                  <div className="input-box">
                    <label>Breed:</label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      placeholder="e.g., Golden Retriever, Siamese"
                    />
                  </div>

                  <div className="input-box">
                    <label>Gender <span className="required">*</span></label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="input-box">
                    <label>Age <span className="required">*</span></label>
                    <div className="age-group">
                      <input
                        type="number"
                        name="ageYears"
                        value={formData.ageYears}
                        onChange={handleChange}
                        placeholder="Years"
                        min="0"
                        required
                      />
                      <input
                        type="number"
                        name="ageMonths"
                        value={formData.ageMonths}
                        onChange={handleChange}
                        placeholder="Months"
                        min="0"
                        max="11"
                        required
                      />
                    </div>
                  </div>

                  {/* Physical Characteristics */}
                  <div className="section-title">Physical Characteristics</div>
                  <div className="input-box">
                    <label>Size:</label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Small">Small (0-10 kg)</option>
                      <option value="Medium">Medium (11-25 kg)</option>
                      <option value="Large">Large (26+ kg)</option>
                    </select>
                  </div>

                  <div className="input-box">
                    <label>Coat Type:</label>
                    <select
                      name="coatType"
                      value={formData.coatType}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Short">Short</option>
                      <option value="Medium">Medium</option>
                      <option value="Long">Long</option>
                      <option value="Hairless">Hairless</option>
                    </select>
                  </div>

                  <div className="input-box full-width">
                    <label>Vaccination Details:</label>
                    <div className="vaccine-checkboxes">
                      {['rabies', 'distemper', 'parvovirus', 'leptospirosis'].map((vaccine) => (
                        <label key={vaccine}>
                          <input
                            type="checkbox"
                            name="vaccines"
                            value={vaccine}
                            checked={formData.vaccines.includes(vaccine)}
                            onChange={handleVaccineChange}
                          />
                          {vaccine}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="input-box full-width">
                    <label>Medication Information:</label>
                    <textarea
                      name="medicationInfo"
                      value={formData.medicationInfo}
                      onChange={handleChange}
                      rows="4"
                      placeholder="List current medications, dosages, and frequency..."
                    ></textarea>
                  </div>

                  <div className="input-box full-width">
                    <label>Health Notes:</label>
                    <textarea
                      name="healthNotes"
                      value={formData.healthNotes}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Any special health considerations or ongoing treatments..."
                    ></textarea>
                  </div>

                  <div className="input-box full-width">
                    <label>Picture:</label>
                    <label className="file-input-label">
                      <span className="file-input-text">Choose a Picture</span>
                      <input
                        className="file-input"
                        type="file"
                        name="petimg"
                        onChange={handleFileChange}
                        key={key}
                        required
                      />
                    </label>
                    {preview && <img src={preview} alt="pet Preview" className="preview-image" height={'300px'} width={'300px'} />}
                  </div>

                  <div className="input-box full-width mt-4">
                    <label>Justification:</label>
                    <textarea
                      name="justification"
                      value={formData.justification}
                      onChange={handleChange}
                      rows="4"
                    ></textarea>
                  </div>

                  <div className="input-box mt-3">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-box mt-3">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="mt-5 cta-button">
                  Submit Your Pet
                </button>
                <button type="button" className="mt-5 cta-button" onClick={handleClose}>
                  Cancel
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default Service;