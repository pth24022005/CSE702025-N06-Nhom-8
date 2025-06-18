// src/pages/BorrowBook.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/BorrowBook.css"; // Đảm bảo file CSS đã tồn tại

// Dữ liệu mẫu ban đầu
const initialBorrows = [
  {
    maPhieu: "PM01",
    soThe: "ST01",
    maSach: "MaS01",
    slMuon: 2,
    ngayMuon: "2025-05-20",
    henTra: "2025-06-05",
    tinhTrang: "Chưa Trả",
    ghiChu: "",
    maNhanVien: "NV01",
  },
  {
    maPhieu: "PM02",
    soThe: "ST02",
    maSach: "MaS03",
    slMuon: 1,
    ngayMuon: "2025-05-22",
    henTra: "2025-06-07",
    tinhTrang: "Chưa Trả",
    ghiChu: "",
    maNhanVien: "NV02",
  },
];

// State mặc định cho form khi ở trạng thái thêm mới hoặc sau khi hủy
const emptyFormState = {
  maPhieu: "",
  soThe: "",
  maSach: "",
  slMuon: 1,
  ngayMuon: new Date().toISOString().split("T")[0],
  henTra: "",
  tinhTrang: "Chưa Trả",
  ghiChu: "",
  maNhanVien: "NV01",
};

const BorrowBook = () => {
  // === STATE MANAGEMENT ===
  const [borrowList, setBorrowList] = useState(initialBorrows);
  const [formData, setFormData] = useState(emptyFormState);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  // === EVENT HANDLERS ===
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRowClick = (ticket) => {
    setSelectedTicketId(ticket.maPhieu);
    setFormData(ticket);
  };

  const clearForm = () => {
    setFormData(emptyFormState);
    setSelectedTicketId(null);
  };

  const handleAdd = () => {
    if (!formData.maPhieu || !formData.maSach || !formData.soThe) {
      alert("Mã phiếu, Mã sách và Số thẻ là bắt buộc!");
      return;
    }
    if (borrowList.some((item) => item.maPhieu === formData.maPhieu)) {
      alert("Mã phiếu mượn đã tồn tại!");
      return;
    }
    setBorrowList((prev) => [...prev, formData]);
    alert("Thêm phiếu mượn thành công!");
    clearForm();
  };

  const handleEdit = () => {
    if (!selectedTicketId) {
      alert("Vui lòng chọn một phiếu mượn để sửa!");
      return;
    }
    setBorrowList((prev) =>
      prev.map((item) => (item.maPhieu === selectedTicketId ? formData : item))
    );
    alert("Cập nhật phiếu mượn thành công!");
    clearForm();
  };

  const handleDelete = () => {
    if (!selectedTicketId) {
      alert("Vui lòng chọn một phiếu mượn để xóa!");
      return;
    }
    if (
      window.confirm(`Bạn có chắc muốn xóa phiếu mượn "${selectedTicketId}"?`)
    ) {
      setBorrowList((prev) =>
        prev.filter((item) => item.maPhieu !== selectedTicketId)
      );
      alert(`Đã xóa phiếu mượn ${selectedTicketId}!`);
      clearForm();
    }
  };

  return (
    <div className="borrow-container bg-white p-4 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">TẠO PHIẾU MƯỢN SÁCH</h4>
        <Link to="/muon-tra" className="btn btn-outline-secondary">
          <i className="fa-solid fa-arrow-left me-2"></i>Quay lại
        </Link>
      </div>

      {/* Form nhập liệu */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          selectedTicketId ? handleEdit() : handleAdd();
        }}
      >
        <div className="row g-4">
          <div className="col-lg-10">
            <div className="row">
              <div className="col-md-6">
                <div className="form-panel p-3 border rounded h-100">
                  <h6>Thông tin sách</h6>
                  <div className="mb-2 row">
                    <label htmlFor="maSach" className="col-sm-4 col-form-label">
                      Mã Sách*
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="maSach"
                        value={formData.maSach}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label
                      htmlFor="tenSach"
                      className="col-sm-4 col-form-label"
                    >
                      Tên Sách
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="tenSach"
                        readOnly
                        placeholder="Tự động điền"
                      />
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label
                      htmlFor="soLuongCon"
                      className="col-sm-4 col-form-label"
                    >
                      SL còn
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="soLuongCon"
                        readOnly
                        placeholder="Tự động điền"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-panel p-3 border rounded h-100">
                  <h6>Thông tin mượn</h6>
                  <div className="mb-2 row">
                    <label
                      htmlFor="maPhieu"
                      className="col-sm-4 col-form-label"
                    >
                      Mã Phiếu*
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="maPhieu"
                        value={formData.maPhieu}
                        onChange={handleInputChange}
                        readOnly={!!selectedTicketId}
                      />
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label htmlFor="soThe" className="col-sm-4 col-form-label">
                      Số Thẻ*
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="soThe"
                        value={formData.soThe}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label htmlFor="slMuon" className="col-sm-4 col-form-label">
                      SL Mượn
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control"
                        id="slMuon"
                        value={formData.slMuon}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label
                      htmlFor="ngayMuon"
                      className="col-sm-4 col-form-label"
                    >
                      Ngày Mượn
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="date"
                        className="form-control"
                        id="ngayMuon"
                        value={formData.ngayMuon}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label htmlFor="henTra" className="col-sm-4 col-form-label">
                      Hẹn Trả
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="date"
                        className="form-control"
                        id="henTra"
                        value={formData.henTra}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="action-sidebar d-grid gap-3">
              <button type="submit" className="btn btn-primary">
                Mượn
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleEdit}
              >
                Sửa
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Xóa
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearForm}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Bảng dữ liệu */}
      <div className="table-section mt-4 border rounded p-3">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Mã Phiếu</th>
                <th>Số Thẻ</th>
                <th>Mã Sách</th>
                <th>SL Mượn</th>
                <th>Ngày Mượn</th>
                <th>Hẹn Trả</th>
                <th>Tình Trạng</th>
              </tr>
            </thead>
            <tbody>
              {borrowList.map((item) => (
                <tr
                  key={item.maPhieu}
                  onClick={() => handleRowClick(item)}
                  className={
                    selectedTicketId === item.maPhieu ? "table-active" : ""
                  }
                >
                  <td>{item.maPhieu}</td>
                  <td>{item.soThe}</td>
                  <td>{item.maSach}</td>
                  <td>{item.slMuon}</td>
                  <td>{item.ngayMuon}</td>
                  <td>{item.henTra}</td>
                  <td>{item.tinhTrang}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;
