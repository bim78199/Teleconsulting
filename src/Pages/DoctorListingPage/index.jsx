import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import doctorsData from '../../Data/doctors.json';
import '../../index.css';

const DoctorListingPage=()=> {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialSpecialization = queryParams.get('specialization') || '';

  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const [specialization, setSpecialization] = useState(initialSpecialization);
  const [experience, setExperience] = useState('');
  const [availability, setAvailability] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 2;

  // Fungsi untuk menangani perubahan filter
  const handleFilter = () => {
    let filtered = doctorsData;

    if (specialization) filtered = filtered.filter(doc => doc.specialization === specialization);

    if (experience) {
      // Filter berdasarkan pengalaman
      if (experience === '>5 years') {
        filtered = filtered.filter(doc => parseInt(doc.experience) > 5);
      } else if (experience === '>10 years') {
        filtered = filtered.filter(doc => parseInt(doc.experience) > 10);
      } else if (experience === '>15 years') {
        filtered = filtered.filter(doc => parseInt(doc.experience) > 15);
      }
    }

    if (availability) filtered = filtered.filter(doc => doc.availability === availability);

    setFilteredDoctors(filtered);
    setCurrentPage(1); // Reset ke halaman pertama saat filter diubah
  };

  // Perbarui URL ketika spesialisasi berubah
  useEffect(() => {
    if (specialization === '') {
      // Hapus parameter dari URL jika "All Specializations" dipilih
      navigate('/doctors', { replace: true });
    } else {
      // Tambahkan parameter jika filter spesialisasi dipilih
      navigate(`/doctors?specialization=${specialization}`, { replace: true });
    }
    handleFilter();
  }, [specialization, experience, availability]);

  // Fungsi Pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="doctor-listing-page">
      <h1>Available Doctors</h1>

      {/* Opsi Filter */}
      <div className="filters">
        <select onChange={(e) => setSpecialization(e.target.value)} value={specialization}>
          <option value="">All Specializations</option>
          <option value="General">General</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Psychology">Psychology</option>
        </select>
        <select onChange={(e) => setExperience(e.target.value)} value={experience}>
          <option value="">All Experience Levels</option>
          <option value=">5 years">{">"}5 years</option>
          <option value=">10 years">{">"}10 years</option>
          <option value=">15 years">{">"}15 years</option>
        </select>
        <select onChange={(e) => setAvailability(e.target.value)} value={availability}>
          <option value="">All Availabilities</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>

      {/* Kartu Dokter */}
      {currentDoctors.map((doctor) => (
        <div key={doctor.id} className="doctor-card">
          <h2>{doctor.name}</h2>
          <p>Specialization: {doctor.specialization}</p>
          <p>Experience: {doctor.experience}</p>
          <p>Consultation Fee: {doctor.consultation_fee}</p>
          <p>Availability: {doctor.availability}</p>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredDoctors.length / doctorsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DoctorListingPage;
