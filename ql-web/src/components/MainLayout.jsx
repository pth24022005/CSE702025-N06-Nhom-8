// src/components/MainLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../assets/css/Layout.css";

const MainLayout = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      navigate("/login");
    }
  };

  return (
    <div className="layout-wrapper">
      <aside
        className={`sidebar-container text-white d-flex flex-column p-3 ${
          !isSidebarVisible ? "collapsed" : ""
        }`}
        onMouseLeave={() => setSidebarVisible(false)}
      >
        <div className="sidebar-profile text-center py-3">
          <img
            src="/img/avatar.jpg"
            alt="Admin Avatar"
            className="rounded-circle mb-2"
            width="80"
            height="80"
          />
          <h5 className="fw-bold mb-0">CHÀO MỪNG</h5>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link">
              <i className="fa-solid fa-house-chimney fa-fw me-2"></i>
              <span>Trang chủ</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/quan-ly-sach" className="nav-link">
              <i className="fa-solid fa-book fa-fw me-2"></i>
              <span>Quản lý sách</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/doc-gia" className="nav-link">
              <i className="fa-solid fa-user-graduate fa-fw me-2"></i>
              <span>Độc giả</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/muon-tra" className="nav-link">
              <i className="fa-solid fa-right-left fa-fw me-2"></i>
              <span>Mượn trả sách</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/nhan-vien" className="nav-link">
              <i className="fa-solid fa-users fa-fw me-2"></i>
              <span>Nhân viên</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/bao-cao" className="nav-link">
              <i className="fa-solid fa-chart-pie fa-fw me-2"></i>
              <span>Báo cáo - Thống kê</span>
            </NavLink>
          </li>
          {/* ========================================================
             ĐÃ XÓA MỤC TÀI KHOẢN TẠI ĐÂY
             ======================================================== */}
        </ul>
        <hr />
        <div>
          <a href="#" className="nav-link" onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
            <span>Đăng xuất</span>
          </a>
        </div>
      </aside>

      <div className="main-content-wrapper">
        <header className="header header-sticky bg-teal text-white p-3 d-flex justify-content-between align-items-center shadow-sm">
          <div className="d-flex align-items-center">
            <button
              className="btn text-white fs-4 me-2"
              id="sidebar-toggle"
              onMouseEnter={() => setSidebarVisible(true)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-book-bookmark fs-2 me-3"></i>
              <div>
                <h4 className="fw-bold mb-0">THƯ VIỆN</h4>
                <small>www.thuvien.com</small>
              </div>
            </div>
          </div>
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="me-3">Hi, Admin</span>
              <img
                src="/img/avatar.jpg"
                alt="Admin Avatar"
                className="rounded-circle"
                width="40"
                height="40"
              />
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </header>
        <main className="main-content p-4">
          <Outlet />
        </main>
        <footer className="footer text-center p-3 bg-white border-top mt-auto">
          Copyright © 2025 Đồ Án Lập Trình
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
