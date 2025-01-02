import React from 'react'
import "../styles/Profile.css";
import { Link } from 'react-router-dom';

const HomeNavbar = () => {
  return (
    <div id="navbar">
    <nav>
      <ul>
        <li><Link to="/patlogin">Patient</Link></li>
        <li><Link to="/doclogin">Doctor</Link></li>
      </ul>
    </nav>
  </div>
  )
}

export default HomeNavbar
