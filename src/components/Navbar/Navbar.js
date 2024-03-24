import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css"
const Navbar = ({ username }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    navigate("/");
    
  };

  return (
    <nav className="navbar">
      <div className="logo">QBlog</div>
      <div className={`nav-links ${showMenu ? 'show' : ''}`}>
        <Link to="/personalblogs">Personal Blogs</Link>
        <Link to="/allblogs">All Blogs</Link>
       
      </div>
      <div className={`user-info`}>
        <span className="welcome-message">Welcome, {localStorage.getItem('username')}</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className="hamburger-icon"></div>
        <div className="hamburger-icon"></div>
        <div className="hamburger-icon"></div>
      </div>
    </nav>
  );
};

export default Navbar;


