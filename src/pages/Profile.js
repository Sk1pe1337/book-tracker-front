import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import "../Auth.css"
function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await API.get('/auth/me');
        setUser(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login'); // Если не авторизован, отправляем на логин
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put('/auth/update', { username, email, password });
      alert('Profile updated successfully!');
      window.location.reload(); // Обновляем страницу после обновления
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    }
  };

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout'); // Выход из аккаунта
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return <h2>Loading profile...</h2>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <form onSubmit={handleUpdate} className="profile-form">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>New Password:</label>
        <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Update Profile</button>
      </form>
      <button onClick={() => navigate('/my-books')} className="back-button">Back to My Books</button>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default Profile;
