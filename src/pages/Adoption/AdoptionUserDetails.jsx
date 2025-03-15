import React from 'react';

function AdoptionUserDetails() {
  return (
    <div className="col-md-8 bg-white shadow-sm rounded p-4">
      <h3 className="text-center fw-bold mb-4">Adoption History</h3>

      {/* Adopted Pet Details */}
      <div className="border-top border-bottom py-3 d-flex justify-content-between align-items-center bg-light-green mb-3">
        <div><strong>Name:</strong> Buddy</div>
        <div><strong>Date:</strong> 2023-10-01</div>
        <div><strong>Breed:</strong> Golden Retriever</div>
        <div><strong>Type:</strong> Dog</div>
      </div>

      {/* Pet Given for Adoption Details */}
      <div className="border-top border-bottom py-3 d-flex justify-content-between align-items-center bg-light-pink">
        <div><strong>Name:</strong> Whiskers</div>
        <div><strong>Date:</strong> 2023-09-15</div>
        <div><strong>Breed:</strong> Siamese</div>
        <div><strong>Type:</strong> Cat</div>
      </div>
    </div>
  );
}

export default AdoptionUserDetails;