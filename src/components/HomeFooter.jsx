import React from 'react'
import "../styles/Profile.css";

const HomeFooter = () => {
  return (
    <div id="footbar">
      <nav>
        <ul>
          <li><h4 style={{ color: '#FFFFFF' }}>© CMSC 191 1st Semester 2024</h4></li>
          <li style={{ float: 'right' }}>
            <h4 style={{ color: '#FFFFFF' }}>
              <a style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              kmlagasca@up.edu.ph & mruiz@up.edu.ph
              </a>
            </h4>
          </li>

        </ul>
      </nav>
    </div>
  )
}

export default HomeFooter
