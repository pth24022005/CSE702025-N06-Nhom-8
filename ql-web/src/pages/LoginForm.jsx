// src/pages/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/login_styles.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "123") {
      alert("Đăng nhập thành công!");
      navigate("/home");
    } else {
      setErrorMessage("Tên đăng nhập hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="container">
        <h1>
          <i className="fa-solid fa-book-open"></i>Đăng nhập
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Nhập tên đăng nhập"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && <div className="error-text">{errorMessage}</div>}

          <div className="forgot-password">
            <a href="#">Quên mật khẩu?</a>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-submit">
              Xác nhận
            </button>
            {}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
