import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // 📌 Подключаем стили

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get('/books/public'); // 📌 Загружаем публичные книги
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching public books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">📚 Welcome to Book Tracker</h1>
      <p className="home-subtitle">Explore books from the public library</p>

      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-card">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Status:</strong> {book.status}</p>
            </div>
          ))
        ) : (
          <p className="no-books">No books found.</p>
        )}
      </div>

      <Link to="/my-books" className="home-button">Go to My Books</Link>
    </div>
  );
}

export default Home;
