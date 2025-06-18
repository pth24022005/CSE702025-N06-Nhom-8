// src/pages/CategoryInfo.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../assets/css/CategoryInfo.css";

const initialGenres = [
  { maTheLoai: "MaTL01", tenTheLoai: "Công Nghệ Thông Tin" },
  { maTheLoai: "MaTL02", tenTheLoai: "Kinh Tế" },
  { maTheLoai: "MaTL03", tenTheLoai: "Xây Dựng" },
  { maTheLoai: "MaTL04", tenTheLoai: "Điện dân dụng" },
  { maTheLoai: "MaTL05", tenTheLoai: "Điện Tử Viễn Thông" },
];

const emptyFormState = { maTheLoai: "", tenTheLoai: "" };

const CategoryInfo = () => {
  const [genres, setGenres] = useState(initialGenres);
  const [formData, setFormData] = useState(emptyFormState);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("id");

  const filteredGenres = useMemo(() => {
    if (!searchTerm) return genres;
    return genres.filter((genre) => {
      const term = searchTerm.toLowerCase();
      const valueToSearch =
        (searchBy === "id" ? genre.maTheLoai : genre.tenTheLoai) || "";
      return valueToSearch.toLowerCase().includes(term);
    });
  }, [genres, searchTerm, searchBy]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRowClick = (genre) => {
    setSelectedGenreId(genre.maTheLoai);
    setFormData(genre);
  };

  const clearForm = () => {
    setFormData(emptyFormState);
    setSelectedGenreId(null);
  };

  const handleSave = () => {
    if (!formData.maTheLoai) {
      alert("Mã Thể Loại là bắt buộc!");
      return;
    }
    if (selectedGenreId) {
      // Chế độ Sửa
      setGenres((prev) =>
        prev.map((genre) =>
          genre.maTheLoai === selectedGenreId ? formData : genre
        )
      );
      alert("Cập nhật thể loại thành công!");
    } else {
      // Chế độ Thêm mới
      if (genres.some((genre) => genre.maTheLoai === formData.maTheLoai)) {
        alert("Mã thể loại đã tồn tại!");
        return;
      }
      setGenres((prev) => [...prev, formData]);
      alert("Thêm thể loại thành công!");
    }
    clearForm();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">THÔNG TIN THỂ LOẠI</h3>
        <Link to="/quan-ly-sach" className="btn btn-outline-secondary">
          <i className="fa-solid fa-arrow-left me-2"></i>Quay lại
        </Link>
      </div>
      <div className="row g-4">
        <div className="col-md-5">
          <div className="search-container p-4 bg-white shadow-sm rounded mb-4">
            <h5 className="mb-3">Tìm kiếm thông tin thể loại</h5>
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
                <label htmlFor="maTheLoai" className="form-label">
                  Mã Thể Loại *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="maTheLoai"
                  value={formData.maTheLoai}
                  onChange={handleInputChange}
                  readOnly={!!selectedGenreId}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tenTheLoai" className="form-label">
                  Tên Thể Loại
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tenTheLoai"
                  value={formData.tenTheLoai}
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex gap-2 mt-4">
                <button type="submit" className="btn btn-success flex-grow-1">
                  LƯU
                </button>
                <button
                  type="button"
                  className="btn btn-secondary flex-grow-1"
                  onClick={clearForm}
                >
                  HỦY
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
                    <th>Mã Thể Loại</th>
                    <th>Tên Thể Loại</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGenres.map((genre) => (
                    <tr
                      key={genre.maTheLoai}
                      onClick={() => handleRowClick(genre)}
                      className={
                        selectedGenreId === genre.maTheLoai
                          ? "table-primary"
                          : ""
                      }
                    >
                      <td>{genre.maTheLoai}</td>
                      <td>{genre.tenTheLoai}</td>
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

export default CategoryInfo;
