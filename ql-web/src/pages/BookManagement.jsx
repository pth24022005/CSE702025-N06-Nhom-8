// src/pages/BookManagement.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/BookManagement.css";

// ========================================================
// THAY ĐỔI Ở ĐÂY: Cập nhật lại mảng dữ liệu với đường dẫn ảnh local
// ========================================================
const sampleBooks = [
  {
    id: 1,
    title: "Đường Về Nhà",
    author: "Dương ngược chiều",
    // Đường dẫn tuyệt đối từ thư mục gốc, trỏ vào thư mục public
    imageUrl: "../../public/img/duong_ve_nha_bia_.jpg",
  },
  {
    id: 2,
    title: "Kiếp Nào Ta Cũng Tìm Thấy Nhau",
    author: "Brian L. Weiss",
    imageUrl: "../../public/img/khiep_nao_ta_cung_tim_thay_nhau.jpg",
  },
  {
    id: 3,
    title: "Chiều Xuống Êm Đềm",
    author: "Nguyễn Thị Thụy Vũ",
    imageUrl: "../../public/img/chieu_xuong_em_dem.jpg",
  },
  {
    id: 4,
    title: "Tớ Học Lập Trình - Làm Quen với Python",
    author: "Louie Stowell & Rosie Dickins",
    imageUrl: "../../public/img/tohoclaptrinhlamquenvoipython0.jpg",
  },
  {
    id: 5,
    title: "Đừng Nhớ Nhầm Ai, Đừng Yêu Sai Người",
    author: "Phương Ny",
    imageUrl: "../../public/img/Đừng nhớ nhầm ai, Đừng yêu sai người.jpg",
  },
];

const BookManagement = () => {
  const handleViewDetails = (bookTitle) => {
    alert(`Bạn đang xem chi tiết sách: "${bookTitle}"`);
  };

  return (
    <>
      <h3 className="mb-4">QUẢN LÝ SÁCH</h3>
      <div className="row g-4 mb-5">
        {/* ... các management-card giữ nguyên ... */}
        <div className="col-lg-3 col-md-6">
          <Link to="/quan-ly-sach/thong-tin" className="management-card">
            <div className="card-icon book-icon">
              <i className="fa-solid fa-book-journal-whills"></i>
            </div>
            <div className="card-text">THÔNG TIN SÁCH</div>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6">
          <Link to="/quan-ly-sach/tac-gia" className="management-card">
            <div className="card-icon author-icon">
              <i className="fa-solid fa-user-pen"></i>
            </div>
            <div className="card-text">TÁC GIẢ</div>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6">
          <Link to="/quan-ly-sach/the-loai" className="management-card">
            <div className="card-icon category-icon">
              <i className="fa-solid fa-shapes"></i>
            </div>
            <div className="card-text">THỂ LOẠI</div>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6">
          <Link to="/quan-ly-sach/nha-xuat-ban" className="management-card">
            <div className="card-icon publisher-icon">
              <i className="fa-solid fa-building"></i>
            </div>
            <div className="card-text">NHÀ XUẤT BẢN</div>
          </Link>
        </div>
      </div>

      <h3 className="mb-4">DANH SÁCH SÁCH</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {sampleBooks.map((book) => (
          <div key={book.id} className="col">
            <div className="card h-100 shadow-sm">
              <img
                src={book.imageUrl}
                className="card-img-top"
                alt={`Bìa sách ${book.title}`}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5
                  className="card-title"
                  style={{ fontSize: "1rem", minHeight: "3rem" }}
                >
                  {book.title}
                </h5>
                <p className="card-text text-muted small">{book.author}</p>
                <button
                  className="btn btn-sm btn-outline-primary mt-auto"
                  onClick={() => handleViewDetails(book.title)}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookManagement;
