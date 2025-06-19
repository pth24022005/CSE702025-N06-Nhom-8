// src/pages/ReturnBook.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../assets/css/ReturnBook.css";

const initialBorrowList = [
  {
    maPhieu: "PM03",
    soThe: "ST03",
    maSach: "MaS03",
    slMuon: 1,
    ngayMuon: "2025-05-10",
    henTra: "2025-05-25",
    tinhTrang: "Chưa Trả",
    ghiChu: "",
  },
  {
    maPhieu: "PM04",
    soThe: "ST01",
    maSach: "MaS04",
    slMuon: 1,
    ngayMuon: "2025-06-01",
    henTra: "2025-06-15",
    tinhTrang: "Chưa Trả",
    ghiChu: "",
  },
  {
    maPhieu: "PM01",
    soThe: "ST01",
    maSach: "MaS01",
    slMuon: 2,
    ngayMuon: "2025-04-25",
    henTra: "2025-05-10",
    tinhTrang: "Đã Trả",
    ghiChu: "Đã trả ngày 10/05/2025",
  },
  {
    maPhieu: "PM02",
    soThe: "ST02",
    maSach: "MaS02",
    slMuon: 1,
    ngayMuon: "2025-03-15",
    henTra: "2025-03-30",
    tinhTrang: "Đã Trả",
    ghiChu: "Đã trả ngày 28/03/2025",
  },
];

const emptyFormState = {
  maPhieu: "",
  soThe: "",
  maSach: "",
  slMuon: 0,
  ngayMuon: "",
  henTra: "",
  tinhTrang: "",
  ghiChu: "",
};

const ReturnBook = () => {
  const [borrowList, setBorrowList] = useState(initialBorrowList);
  const [formData, setFormData] = useState(emptyFormState);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const unreturnedList = useMemo(
    () => borrowList.filter((item) => item.tinhTrang === "Chưa Trả"),
    [borrowList]
  );

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
    setSearchTerm("");
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Vui lòng nhập Mã Phiếu Mượn để tìm kiếm.");
      return;
    }
    const foundTicket = borrowList.find(
      (item) => item.maPhieu.toLowerCase() === searchTerm.toLowerCase()
    );

    if (foundTicket) {
      handleRowClick(foundTicket);
    } else {
      alert(`Không tìm thấy phiếu mượn với mã "${searchTerm}".`);
    }
  };

  const handleReturnBook = () => {
    const ticketToReturnId = formData.maPhieu;
    if (!ticketToReturnId) {
      alert("Vui lòng nhập hoặc chọn một phiếu mượn để trả sách!");
      return;
    }

    const ticketExists = borrowList.some(
      (item) => item.maPhieu === ticketToReturnId
    );
    if (!ticketExists) {
      alert(`Phiếu mượn "${ticketToReturnId}" không tồn tại!`);
      return;
    }

    setBorrowList((prevList) =>
      prevList.map((item) =>
        item.maPhieu === ticketToReturnId
          ? {
              ...item,
              tinhTrang: "Đã Trả",
              ghiChu:
                formData.ghiChu ||
                `Đã trả ngày ${new Date().toLocaleDateString("vi-VN")}`,
            }
          : item
      )
    );
    alert(`Đã xác nhận trả sách cho phiếu ${ticketToReturnId}!`);
    clearForm();
  };

  return (
    <div className="return-container bg-white p-4 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">THÔNG TIN TRẢ SÁCH</h4>
        <Link to="/muon-tra" className="btn btn-outline-secondary">
          <i className="fa-solid fa-arrow-left me-2"></i>Quay lại
        </Link>
      </div>
      <div className="row g-4">
        <div className="col-lg-9">
          <div className="row g-4">
            <div className="col-md-5">
              <div className="form-panel p-3 border rounded h-100">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  <h6>Tìm Kiếm Phiếu Mượn</h6>
                  <div className="input-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập mã phiếu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">
                      <i className="fa-solid fa-search me-1"></i> Tìm
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-7">
              <div className="form-panel p-3 border rounded h-100">
                <h6 className="mb-3">Thông tin phiếu trả sách</h6>
                <div className="row g-3">
                  {}
                  <div className="col-6">
                    <label htmlFor="maPhieu" className="form-label">
                      Mã Phiếu Mượn
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="maPhieu"
                      value={formData.maPhieu}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="maSach" className="form-label">
                      Mã Sách
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="maSach"
                      value={formData.maSach}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="soThe" className="form-label">
                      Số Thẻ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="soThe"
                      value={formData.soThe}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="slMuon" className="form-label">
                      SL Mượn
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="slMuon"
                      value={formData.slMuon}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="ngayMuon" className="form-label">
                      Ngày Mượn
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="ngayMuon"
                      value={formData.ngayMuon}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="henTra" className="form-label">
                      Hẹn Trả
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="henTra"
                      value={formData.henTra}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="ghiChu" className="form-label">
                      Ghi Chú
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ghiChu"
                      value={formData.ghiChu}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-section mt-4 border rounded p-3">
            <h6 className="mb-3">Danh sách phiếu mượn chưa trả</h6>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Mã Phiếu</th>
                    <th>Số Thẻ</th>
                    <th>Mã Sách</th>
                    <th>Ngày Mượn</th>
                    <th>Hẹn Trả</th>
                  </tr>
                </thead>
                <tbody>
                  {unreturnedList.map((item) => (
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
                      <td>{item.ngayMuon}</td>
                      <td>{item.henTra}</td>
                    </tr>
                  ))}
                  {unreturnedList.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted p-3">
                        Không có phiếu mượn nào chưa trả.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="action-sidebar d-grid gap-3 pt-3">
            <button className="btn btn-success" onClick={handleReturnBook}>
              Xác Nhận Trả Sách
            </button>
            <button className="btn btn-secondary" onClick={clearForm}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnBook;
