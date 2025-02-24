import React from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

function Header() {
  const handleLogout = async () => {
    try {
      await API.post('/auth/logout'); // Корректный выход
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav>
      <Link to="/my-books">My Books</Link>
      <Link to="/add-book">Add Book</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Header;
