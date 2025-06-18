// src/pages/AuthorInfo.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../assets/css/AuthorInfo.css";

const initialAuthors = [
  { maTacGia: "MaTG01", tenTacGia: "Ngô Bá Lực", lienHe: "DH Quốc Gia" },
  { maTacGia: "MaTG02", tenTacGia: "Huỳnh Minh Phương", lienHe: "DH Điện Lực" },
  { maTacGia: "MaTG03", tenTacGia: "Trần Huy Minh", lienHe: "Hà Nội" },
  { maTacGia: "MaTG04", tenTacGia: "Thái Bình Minh", lienHe: "epu.edu.com" },
];

const emptyFormState = { maTacGia: "", tenTacGia: "", lienHe: "" };

const AuthorInfo = () => {
  const [authors, setAuthors] = useState(initialAuthors);
  const [formData, setFormData] = useState(emptyFormState);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("id");

  const filteredAuthors = useMemo(() => {
    if (!searchTerm) return authors;
    return authors.filter((author) => {
      const term = searchTerm.toLowerCase();
      const valueToSearch =
        (searchBy === "id" ? author.maTacGia : author.tenTacGia) || "";
      return valueToSearch.toLowerCase().includes(term);
    });
  }, [authors, searchTerm, searchBy]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRowClick = (author) => {
    setSelectedAuthorId(author.maTacGia);
    setFormData(author);
  };

  const clearForm = () => {
    setFormData(emptyFormState);
    setSelectedAuthorId(null);
    const selectedRow = document.querySelector(".table tbody tr.table-primary");
    if (selectedRow) {
      selectedRow.classList.remove("table-primary");
    }
  };

  const handleSave = () => {
    if (!formData.maTacGia) {
      alert("Mã Tác Giả là bắt buộc!");
      return;
    }
    // Dựa vào state `selectedAuthorId` để quyết định Thêm hay Sửa
    if (selectedAuthorId) {
      // Sửa
      setAuthors((prev) =>
        prev.map((author) =>
          author.maTacGia === selectedAuthorId ? formData : author
        )
      );
      alert("Cập nhật tác giả thành công!");
    } else {
      // Thêm
      if (authors.some((author) => author.maTacGia === formData.maTacGia)) {
        alert("Mã tác giả đã tồn tại!");
        return;
      }
      setAuthors((prev) => [...prev, formData]);
      alert("Thêm tác giả thành công!");
    }
    clearForm();
  };

  // Nút View giờ có chức năng là xóa trắng form để sẵn sàng thêm mới
  const handleViewClick = () => {
    clearForm();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">THÔNG TIN TÁC GIẢ</h3>
        <Link to="/quan-ly-sach" className="btn btn-outline-secondary">
          <i className="fa-solid fa-arrow-left me-2"></i>Quay lại
        </Link>
      </div>
      <div className="row g-4">
        <div className="col-md-5">
          <div className="search-container p-4 bg-white shadow-sm rounded mb-4">
            <h5 className="mb-3">Tìm kiếm thông tin tác giả</h5>
            <div className="d-flex mb-2">
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
                  Tìm Kiếm Mã
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
                  Tìm Kiếm Tên
                </label>
              </div>
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="form-container p-4 bg-white shadow-sm rounded">
            <h5 className="mb-3">Thêm / Cập nhật</h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-3">
                <label htmlFor="maTacGia" className="form-label">
                  Mã Tác Giả *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="maTacGia"
                  value={formData.maTacGia}
                  onChange={handleInputChange}
                  readOnly={!!selectedAuthorId}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tenTacGia" className="form-label">
                  Tên Tác Giả
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tenTacGia"
                  value={formData.tenTacGia}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lienHe" className="form-label">
                  Liên Hệ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lienHe"
                  value={formData.lienHe}
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex gap-2 mt-4">
                <button type="submit" className="btn btn-success flex-grow-1">
                  LƯU
                </button>
                <button
                  type="button"
                  className="btn btn-info flex-grow-1"
                  onClick={handleViewClick}
                >
                  THÊM MỚI
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-7">
          <div className="table-container bg-white shadow-sm rounded p-3">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Mã Tác Giả</th>
                    <th>Tên Tác Giả</th>
                    <th>Liên Hệ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAuthors.map((author) => (
                    <tr
                      key={author.maTacGia}
                      onClick={() => handleRowClick(author)}
                      className={
                        selectedAuthorId === author.maTacGia
                          ? "table-primary"
                          : ""
                      }
                    >
                      <td>{author.maTacGia}</td>
                      <td>{author.tenTacGia}</td>
                      <td>{author.lienHe}</td>
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

export default AuthorInfo;
