// src/pages/BorrowReturn.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/BorrowReturn.css";

const BorrowReturn = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <h3 className="mb-4">QUẢN LÝ MƯỢN TRẢ</h3>
      </div>

      {/* Cột Mượn Sách */}
      <div className="col-md-6">
        <Link to="/muon-tra/muon-sach" className="action-card muon-sach">
          <div className="action-card-image">
            {}
            <img src="/img/BorrowBook.png" alt="Mượn sách" />
          </div>
          <div className="action-card-label">MƯỢN SÁCH</div>
        </Link>
      </div>

      {/* Cột Trả Sách */}
      <div className="col-md-6">
        <Link to="/muon-tra/tra-sach" className="action-card tra-sach">
          <div className="action-card-image">
            {}
            <img src="/img/ReturnBook.png" alt="Trả sách" />
          </div>
          <div className="action-card-label">TRẢ SÁCH</div>
        </Link>
      </div>
    </div>
  );
};

export default BorrowReturn;
