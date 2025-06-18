// src/pages/HomePage.jsx
import React from "react";
import "./../assets/css/HomePage.css"; // Import CSS riêng của trang chủ

const HomePage = () => {
  return (
    <>
      <h2 className="mb-4">HỆ THỐNG QUẢN LÝ THƯ VIỆN ĐẠI HỌC PHENIKAA</h2>

      {/* --- Banner Chào Mừng --- */}
      <div className="welcome-banner">
        <div className="welcome-banner-text">
          <h1 className="display-4 fw-bold">WELCOME TO PKA</h1>
        </div>
        {/* Đã xóa các student-placeholder */}
      </div>

      {/* --- THÊM MỚI: Khu vực sách nổi bật --- */}
      <div className="top-books-section">
        <h3 className="top-books-title mb-4">Top 10 Most Borrowed Books</h3>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="category-card bg-yellow">
              <div className="icon-wrapper">
                <i className="fa-solid fa-book-open-reader"></i>
              </div>
              <div className="category-name mt-3">Sách giáo trình</div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="category-card bg-blue">
              <div className="icon-wrapper">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <div className="category-name mt-3">Sách kỹ năng</div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="category-card bg-pink">
              <div className="icon-wrapper">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <div className="category-name mt-3">Sách tham khảo</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
