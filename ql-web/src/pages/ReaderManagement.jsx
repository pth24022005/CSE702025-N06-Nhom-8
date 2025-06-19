// src/pages/ReaderManagement.jsx
import React, { useState, useMemo } from "react";

import "../assets/css/ReaderManagement.css";

// Dữ liệu mẫu ban đầu
const initialReaders = [
  {
    maDocGia: "MaDG01",
    tenDocGia: "Nguyễn Khả Nam",
    gioiTinh: "Nam",
    diaChi: "Hà Nội",
    soThe: "ST01",
  },
  {
    maDocGia: "MaDG02",
    tenDocGia: "Lê Văn Hiếu",
    gioiTinh: "Nam",
    diaChi: "Thái Bình",
    soThe: "ST02",
  },
  {
    maDocGia: "MaDG03",
    tenDocGia: "Trần Thị Mai",
    gioiTinh: "Nữ",
    diaChi: "Hải Phòng",
    soThe: "ST03",
  },
  {
    maDocGia: "MaDG04",
    tenDocGia: "Mai Anh Tuấn",
    gioiTinh: "Nam",
    diaChi: "Hà Nội",
    soThe: "ST04",
  },
];

const emptyFormState = {
  maDocGia: "",
  tenDocGia: "",
  gioiTinh: "",
  diaChi: "",
  soThe: "",
};

const ReaderManagement = () => {
  // === QUẢN LÝ STATE BẰNG REACT HOOKS ===

  const [readers, setReaders] = useState(initialReaders);
  const [formData, setFormData] = useState(emptyFormState);
  const [selectedReaderId, setSelectedReaderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("id");

  // === CÁC HÀM XỬ LÝ SỰ KIỆN ===

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleRowClick = (reader) => {
    setFormData(reader);
    setSelectedReaderId(reader.maDocGia);
  };

  const handleCancel = () => {
    setFormData(emptyFormState);
    setSelectedReaderId(null);
  };

  const handleAdd = () => {
    if (!formData.maDocGia || !formData.tenDocGia) {
      alert("Mã Độc Giả và Tên Độc Giả là bắt buộc!");
      return;
    }
    if (readers.some((reader) => reader.maDocGia === formData.maDocGia)) {
      alert("Mã Độc Giả đã tồn tại!");
      return;
    }
    setReaders((prevReaders) => [...prevReaders, formData]);
    handleCancel();
    alert("Thêm độc giả thành công!");
  };

  const handleEdit = () => {
    if (!selectedReaderId) {
      alert("Vui lòng chọn một độc giả từ danh sách để sửa!");
      return;
    }
    setReaders((prevReaders) =>
      prevReaders.map((reader) =>
        reader.maDocGia === selectedReaderId ? formData : reader
      )
    );
    handleCancel();
    alert("Cập nhật thông tin thành công!");
  };

  const handleDelete = () => {
    if (!selectedReaderId) {
      alert("Vui lòng chọn một độc giả từ danh sách để xóa!");
      return;
    }
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa độc giả có mã "${selectedReaderId}" không?`
      )
    ) {
      setReaders((prevReaders) =>
        prevReaders.filter((reader) => reader.maDocGia !== selectedReaderId)
      );
      handleCancel();
      alert("Xóa độc giả thành công!");
    }
  };

  const filteredReaders = useMemo(() => {
    if (!searchTerm) return readers;
    return readers.filter((reader) => {
      const term = searchTerm.toLowerCase();
      if (searchBy === "id") {
        return reader.maDocGia.toLowerCase().includes(term);
      } else {
        return reader.tenDocGia.toLowerCase().includes(term);
      }
    });
  }, [readers, searchTerm, searchBy]);

  // === RENDER GIAO DIỆN (JSX) ===
  return (
    <>
      <h3 className="mb-4">QUẢN LÝ ĐỘC GIẢ</h3>
      <div className="row g-4">
        {/* Cột Form Nhập Liệu */}
        <div className="col-md-5">
          <div className="form-container p-4 bg-white shadow-sm rounded">
            <h5 className="mb-3">Thông tin độc giả</h5>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <label htmlFor="maDocGia" className="form-label">
                  Mã Độc Giả *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="maDocGia"
                  value={formData.maDocGia}
                  onChange={handleFormChange}
                  readOnly={!!selectedReaderId}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tenDocGia" className="form-label">
                  Họ Tên *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tenDocGia"
                  value={formData.tenDocGia}
                  onChange={handleFormChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gioiTinh" className="form-label">
                  Giới Tính
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="gioiTinh"
                  value={formData.gioiTinh}
                  onChange={handleFormChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="diaChi" className="form-label">
                  Địa Chỉ
                </label>
                <textarea
                  className="form-control"
                  id="diaChi"
                  rows="3"
                  value={formData.diaChi}
                  onChange={handleFormChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="soThe" className="form-label">
                  Số Thẻ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="soThe"
                  value={formData.soThe}
                  onChange={handleFormChange}
                />
              </div>
            </form>
            <div className="row g-2 mt-4">
              <div className="col-4 d-grid">
                <button className="btn btn-primary" onClick={handleAdd}>
                  Thêm
                </button>
              </div>
              <div className="col-4 d-grid">
                <button className="btn btn-warning" onClick={handleEdit}>
                  Sửa
                </button>
              </div>
              <div className="col-4 d-grid">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Xóa
                </button>
              </div>
              <div className="col-4 d-grid">
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
          <div className="library-card-graphic mt-4 p-3 d-flex align-items-center justify-content-center">
            <i className="fa-solid fa-id-card fa-2x me-3"></i>
            <h5 className="mb-0">THẺ THƯ VIỆN</h5>
            <i className="fa-solid fa-check-circle fa-2x ms-auto text-success"></i>
          </div>
        </div>

        {/* Cột Bảng Dữ Liệu và Tìm Kiếm */}
        <div className="col-md-7">
          <div className="search-section p-3 bg-white shadow-sm rounded mb-4">
            <h5 className="mb-3">Tìm kiếm thông tin</h5>
            <div className="d-flex align-items-center">
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="searchOptions"
                    id="searchById"
                    value="id"
                    checked={searchBy === "id"}
                    onChange={(e) => setSearchBy(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="searchById">
                    Theo Mã
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="searchOptions"
                    id="searchByName"
                    value="name"
                    checked={searchBy === "name"}
                    onChange={(e) => setSearchBy(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="searchByName">
                    Theo Tên
                  </label>
                </div>
              </div>
              <div className="input-group ms-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập để tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="table-container p-3 bg-white shadow-sm rounded">
            <div className="table-icon mb-3">
              <i className="fa-solid fa-users-rectangle fa-3x"></i>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Mã Độc Giả</th>
                    <th>Tên Độc Giả</th>
                    <th>Giới Tính</th>
                    <th>Địa Chỉ</th>
                    <th>Số Thẻ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReaders.map((reader) => (
                    <tr
                      key={reader.maDocGia}
                      onClick={() => handleRowClick(reader)}
                      className={
                        selectedReaderId === reader.maDocGia
                          ? "table-active"
                          : ""
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td>{reader.maDocGia}</td>
                      <td>{reader.tenDocGia}</td>
                      <td>{reader.gioiTinh}</td>
                      <td>{reader.diaChi}</td>
                      <td>{reader.soThe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReaderManagement;
