import React, { useState, useEffect } from 'react';
import API from '../api/api';

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('Reading');

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books/my');
      setBooks(res.data);
    } catch (error) {
      alert('Failed to fetch books');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await API.delete(`/books/${id}`);
        setBooks(books.filter((book) => book._id !== id));
        alert('Book deleted successfully');
      } catch (error) {
        alert('Failed to delete book');
      }
    }
  };

  const handleEdit = (book) => {
    setEditBook(book._id);
    setTitle(book.title);
    setAuthor(book.author);
    setStatus(book.status);
  };

  const handleCancelEdit = () => {
    setEditBook(null);
    setTitle('');
    setAuthor('');
    setStatus('Reading');
  };

  const handleUpdate = async () => {
    try {
      const res = await API.patch(`/books/${editBook}`, { title, author, status });
      setBooks(books.map((book) => (book._id === editBook ? res.data.book : book)));
      alert('Book updated successfully');
      handleCancelEdit();
    } catch (error) {
      alert('Failed to update book');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 My Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="border p-3 flex justify-between items-center mb-2">
            {editBook === book._id ? (
              <>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Reading">Reading</option>
                  <option value="Completed">Completed</option>
                  <option value="Wishlist">Wishlist</option>
                </select>
                <button onClick={handleUpdate}>💾 Save</button>
                <button onClick={handleCancelEdit}>❌ Cancel</button>
              </>
            ) : (
              <>
                <span>{book.title} - {book.author} ({book.status})</span>
                <button onClick={() => handleEdit(book)}>✏️ Edit</button>
                <button onClick={() => handleDelete(book._id)}>❌ Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBooks;
