import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Подключаем CSS

function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-item">📖 Library</Link>
        {isAuthenticated && <Link to="/my-books" className="nav-item">📚 My Books</Link>}
        {isAuthenticated && <Link to="/add-book" className="nav-item">➕ Add Book</Link>}
        {isAuthenticated && <Link to="/profile" className="nav-item">👤 Profile</Link>}
      </div>

      {isAuthenticated ? (
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      ) : (
        <div className="nav-links">
          <Link to="/login" className="nav-item login-btn">Login</Link>
          <Link to="/register" className="nav-item register-btn">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
