import React from 'react';
import '../../index.css';

const DoctorCard=({ doctor })=> {
  return (
    <div className="doctor-card">
      <h2>{doctor.name}</h2>
      <p>Specialization: {doctor.specialization}</p>
      <p>Experience: {doctor.experience}</p>
      <p>Consultation Fee: {doctor.consultation_fee}</p>
      <p>Availability: {doctor.availability}</p>
    </div>
  );
}

export default DoctorCard;
