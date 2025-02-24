import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

function Login({ setIsAuthenticated }) { // 📌 Добавляем setIsAuthenticated
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', { email, password });

      // ✅ Сохраняем токен
      localStorage.setItem("token", response.data.token);
      
      // ✅ Обновляем состояние авторизации
      setIsAuthenticated(true);

      alert('Login successful');
      navigate('/my-books');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="button-group">
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="register-button" onClick={() => navigate('/register')}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
