import React from 'react';
import './navbar.css'

const Navbar = ({ onHomeClick, onLoginClick, onSignupClick, onLogoutClick, isAuthenticated, user }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li onClick={onHomeClick}>Home</li>
        {isAuthenticated ? (
          <>
            <li>Hello, {user?.username}</li>
            <li onClick={onLogoutClick}>Logout</li>
          </>
        ) : (
          <>
            <li onClick={onLoginClick}>Login</li>
            <li onClick={onSignupClick}>Sign Up</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
