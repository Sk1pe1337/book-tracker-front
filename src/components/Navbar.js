import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-white text-lg font-bold">📖 Library</Link>
        {isAuthenticated && <Link to="/my-books" className="text-white text-lg">📚 My Books</Link>}
        {isAuthenticated && <Link to="/add-book" className="text-white text-lg">➕ Add Book</Link>}
        {isAuthenticated && <Link to="/profile" className="text-white text-lg">👤 Profile</Link>}
      </div>

      {isAuthenticated ? (
        <button 
          onClick={handleLogout} 
          className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600"
          style={{ minWidth: "120px" }} // ✅ Фикс ширины кнопки Logout
        >
          Logout
        </button>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="bg-gray-800 px-4 py-2 text-white rounded hover:bg-gray-900">
            Login
          </Link>
          <Link to="/register" className="bg-green-600 px-4 py-2 text-white rounded hover:bg-green-700">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
