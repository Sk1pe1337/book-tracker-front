import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import "../Auth.css"

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { username, email, password });
      alert('Registration successful! Logging in...');
      
      // ✅ Автоматически логиним после успешной регистрации
      const response = await API.post('/auth/login', { email, password });
      localStorage.setItem("token", response.data.token);

      navigate('/my-books'); // Перенаправляем пользователя в "My Books"
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <div className="button-group">
          <button type="submit" className="register-button">Register</button>
          <button type="button" className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
