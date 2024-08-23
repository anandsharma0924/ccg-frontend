import React from 'react'

export const Navbar = () => {
  return (
    <div>
    
    <header className="navbar">
        <div className="logo">
          Coaching<span>Pro</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#testimonials">Testimonials</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="Login">Login</a>
          </li>
         
          <br />
        </ul>
      </header>
    </div>
  )
}
