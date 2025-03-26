import React, { useState, useEffect } from 'react';
import './Groomer.css'; // Import the CSS file for styling
import { getAllGroomerApi } from '../../services/allApi';
import { serverUrl } from '../../services/serverUrl';

function Groomer() {
    const [groomers, setGroomers] = useState([]); // State to store groomers' data

    // Fetch all groomers' data
    useEffect(() => {
        fetchGroomers();
    }, []);

    const fetchGroomers = async () => {
        try {
            const response = await getAllGroomerApi();
            console.log(response);

            // Filter groomers with status "accepted"
            const acceptedGroomers = response.data.filter(
                (groomer) => groomer.status === 'accepted'
            );

            setGroomers(acceptedGroomers); // Set the filtered groomers
        } catch (error) {
            console.error('Error fetching groomers:', error);
        }
    };

    return (
        <>
            <div className="groomer-container">
                <h1 className="groomer-title">All Groomers</h1>

                <div className="row">
                    {groomers.map((groomer) => (
                        <div className="col-md-4" key={groomer._id}>
                            <div className="groomer-card">
                                {/* Profile Picture */}
                                <img
                                    src={`${serverUrl}/uploads/${groomer.profilePicture}`}
                                    alt="Profile"
                                    className="groomer-image"
                                />

                                {/* Groomer Details */}
                                <h3 className="groomer-name">{groomer.name}</h3>
                                <p className="groomer-email">
                                    <strong>Email:</strong> {groomer.email}
                                </p>
                                <p className="groomer-phone">
                                    <strong>Phone:</strong> {groomer.phone}
                                </p>
                                <p className="groomer-address">
                                    <strong>Address:</strong> {groomer.address}
                                </p>
                                <p className="groomer-experience">
                                    <strong>Experience:</strong> {groomer.experience} years
                                </p>
                                <p className="groomer-license">
                                    <strong>License:</strong> {groomer.license}
                                </p>
                                <p className="groomer-certification">
                                    <strong>Certifications:</strong> {groomer.certification.join(', ')}
                                </p>
                                <p className="groomer-services">
                                    <strong>Services:</strong> {groomer.services.join(', ')}
                                </p>
                                <p className="groomer-availability">
                                    <strong>Availability:</strong>
                                    {groomer.availability && groomer.availability.length > 0 ? (
                                        groomer.availability.map(day => (
                                            <div key={day.day}>
                                                <strong>{day.day}:</strong>
                                                {day.slots
                                                    .filter(slot => slot.status === 'available')
                                                    .map(slot => `${slot.start}-${slot.end}`)
                                                    .join(', ')}
                                            </div>
                                        ))
                                    ) : (
                                        'Not available'
                                    )}
                                </p>
                                <p className="groomer-bio">
                                    <strong>Bio:</strong> {groomer.bio}
                                </p>
                                <p className="groomer-createdAt">
                                    <strong>Registered On:</strong> {new Date(groomer.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Groomer;