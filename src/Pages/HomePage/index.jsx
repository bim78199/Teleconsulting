import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

const HomePage=()=> {
  return (
    <div className="home-page">
      <h1>Welcome to Teleconsulting Platform</h1>
      <h2>Featured Doctors and Specializations</h2>
      <Link to="/doctors" style={{ textDecoration: "none" }}>
        <button className="view-doctors-button">View Doctors</button>
      </Link>
      <div className="categories">
        <h3>Consultation Categories:</h3>
        <ul>
          <li>
            <Link to="/doctors?specialization=General" style={{ textDecoration: "none", color: "inherit" }}>
              General
            </Link>
          </li>
          <li>
            <Link to="/doctors?specialization=Pediatrics" style={{ textDecoration: "none", color: "inherit" }}>
              Pediatrics
            </Link>
          </li>
          <li>
            <Link to="/doctors?specialization=Psychology" style={{ textDecoration: "none", color: "inherit" }}>
              Psychology
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
