import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Library from "./pages/Library";
import MyBooks from "./pages/MyBooks";
import AddBook from "./pages/AddBook";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import API from "./api/api";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 📌 Проверяем авторизацию пользователя
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // 📌 Функция выхода из аккаунта
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      localStorage.removeItem("token");
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsAuthenticated(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      
      <div className="main-container">
        <Routes>
          {/* 📌 Главная страница - Library */}
          <Route path="/" element={<Library />} /> 

          {/* 📌 Перенаправление авторизованных пользователей на главную */}
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

          {/* 📌 Защищённые маршруты (только для авторизованных пользователей) */}
          <Route path="/my-books" element={isAuthenticated ? <MyBooks /> : <Navigate to="/login" />} />
          <Route path="/add-book" element={isAuthenticated ? <AddBook /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />

          {/* 📌 Перенаправление на главную, если путь не найден */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
