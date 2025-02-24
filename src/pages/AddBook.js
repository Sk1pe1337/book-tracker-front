import React, { useState } from 'react';
import API from '../api/api';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('Reading');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем, что поля не пустые
    if (!title.trim() || !author.trim()) {
      alert('Title and author are required!');
      return;
    }

    try {
      const response = await API.post('/books', {
        title,
        author, // Убедись, что сервер ждёт именно `author`, а не `authorName`
        status,
      });

      alert('Book added successfully');
      window.location.href = '/my-books';
    } catch (error) {
      console.error('Error adding book:', error.response?.data);
      alert(error.response?.data?.message || 'Failed to add book');
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Reading">Reading</option>
          <option value="Completed">Completed</option>
          <option value="Wishlist">Wishlist</option>
        </select>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
