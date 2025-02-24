import React, { useState, useEffect } from 'react';
import API from '../api/api';

function Library() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books/public'); // 📌 Получаем публичные книги
      setBooks(res.data);
    } catch (error) {
      alert('Failed to fetch library books');
      console.error('Error fetching library books:', error);
    }
  };

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, books]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Library</h2>

      <input
        type="text"
        placeholder="🔍 Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <ul>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book._id} className="border p-3 mb-2">
              <span>{book.title} - {book.author}</span>
            </li>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </ul>
    </div>
  );
}

export default Library;
