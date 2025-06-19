// src/pages/BookInfo.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../assets/css/BookInfo.css";

// Dữ liệu mẫu ban đầu cho sách
const initialBooks = [
  {
    maSach: "MaS01",
    tenSach: "Đừng lựa chọn an nhàn khi còn trẻ",
    maTacGia: "TG01",
    maTheLoai: "TL03",
    maNXB: "NXB02",
    namXB: "2020",
    soLuong: 10,
    anh: "/images/books/tuoi-tre.jpg",
  },
  {
    maSach: "MaS02",
    tenSach: "Kiếp Nào Ta Cũng Tìm Thấy Nhau",
    maTacGia: "TG02",
    maTheLoai: "TL03",
    maNXB: "NXB01",
    namXB: "2018",
    soLuong: 15,
    anh: "/images/books/kiep-nao.jpg",
  },
];

// State mặc định cho form
const emptyFormState = {
  maSach: "",
  tenSach: "",
  maTacGia: "",
  maTheLoai: "",
  maNXB: "",
  namXB: "",
  soLuong: 0,
  anh: "",
};

const BookInfo = () => {
  const [books, setBooks] = useState(initialBooks);
  const [formData, setFormData] = useState(emptyFormState);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const stats = useMemo(
    () => ({
      categories: new Set(books.map((b) => b.maTheLoai)).size,
      publishers: new Set(books.map((b) => b.maNXB)).size,
      totalCount: books.reduce((acc, b) => acc + Number(b.soLuong || 0), 0),
    }),
    [books]
  );

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, anh: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRowClick = (book) => {
    setSelectedBookId(book.maSach);
    setFormData(book);
    setImagePreview(book.anh || "");
  };

  const clearForm = () => {
    setFormData(emptyFormState);
    setSelectedBookId(null);
    setImagePreview("");
    if (document.getElementById("file-upload")) {
      document.getElementById("file-upload").value = "";
    }
  };

  const handleAdd = () => {
    if (!formData.maSach || !formData.tenSach) {
      alert("Mã Sách và Tên Sách là bắt buộc!");
      return;
    }
    if (books.some((b) => b.maSach === formData.maSach)) {
      alert("Mã sách đã tồn tại!");
      return;
    }
    const newBook = {
      ...formData,
      anh: formData.anh || `https://i.pravatar.cc/150?u=${formData.maSach}`,
    };
    setBooks((prev) => [...prev, newBook]);
    alert("Thêm sách thành công!");
    clearForm();
  };

  const handleUpdate = () => {
    if (!selectedBookId) {
      alert("Vui lòng chọn một cuốn sách để cập nhật!");
      return;
    }
    setBooks((prev) =>
      prev.map((b) => (b.maSach === selectedBookId ? formData : b))
    );
    alert("Cập nhật sách thành công!");
    clearForm();
  };

  const handleDelete = () => {
    if (!selectedBookId) {
      alert("Vui lòng chọn một cuốn sách để xóa!");
      return;
    }
    if (window.confirm(`Bạn có chắc muốn xóa sách "${formData.tenSach}"?`)) {
      setBooks((prev) => prev.filter((b) => b.maSach !== selectedBookId));
      alert("Xóa sách thành công!");
      clearForm();
    }
  };

  return (
    <div className="book-info-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">THÔNG TIN CHI TIẾT SÁCH</h3>
        <Link to="/quan-ly-sach" className="btn btn-outline-secondary">
          <i className="fa-solid fa-arrow-left me-2"></i>Quay lại
        </Link>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <div className="form-section p-4 bg-white rounded">
            <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
              <div className="col-md-3">
                <div className="image-uploader d-flex justify-content-center align-items-center border rounded">
                  <input
                    id="file-upload"
                    type="file"
                    className="d-none"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="file-upload"
                    className="w-100 h-100 d-flex justify-content-center align-items-center"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Xem trước"
                        className="preview-image"
                      />
                    ) : (
                      <span className="text-muted">Choose file</span>
                    )}
                  </label>
                </div>
              </div>
              <div className="col-md-9">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="maSach" className="form-label">
                      Mã Sách *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="maSach"
                      value={formData.maSach}
                      onChange={handleInputChange}
                      readOnly={!!selectedBookId}
                    />
                  </div>

                  {/* === THAY ĐỔI: Chuyển thành input text === */}
                  <div className="col-md-6">
                    <label htmlFor="maTheLoai" className="form-label">
                      Mã Thể Loại
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="maTheLoai"
                      value={formData.maTheLoai}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="tenSach" className="form-label">
                      Tên Sách *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tenSach"
                      value={formData.tenSach}
                      onChange={handleInputChange}
                    />
                  </div>

                  {}
                  <div className="col-md-6">
                    <label htmlFor="maNXB" className="form-label">
                      Mã NXB
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="maNXB"
                      value={formData.maNXB}
                      onChange={handleInputChange}
                    />
                  </div>

                  {}
                  <div className="col-md-6">
                    <label htmlFor="maTacGia" className="form-label">
                      Mã Tác Giả
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="maTacGia"
                      value={formData.maTacGia}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="namXB" className="form-label">
                      Năm Xuất Bản
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="namXB"
                      value={formData.namXB}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="soLuong" className="form-label">
                      Số Lượng
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="soLuong"
                      value={formData.soLuong}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="table-section mt-4 bg-white rounded p-3">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Mã Sách</th>
                    <th>Ảnh</th>
                    <th>Tên Sách</th>
                    <th>Mã Tác Giả</th>
                    <th>Mã Thể Loại</th>
                    <th>Mã NXB</th>
                    <th>Năm XB</th>
                    <th>Số Lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr
                      key={book.maSach}
                      onClick={() => handleRowClick(book)}
                      className={
                        selectedBookId === book.maSach ? "table-active" : ""
                      }
                    >
                      <td>{book.maSach}</td>
                      <td>
                        <img
                          src={book.anh}
                          alt={book.tenSach}
                          style={{
                            width: "45px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "2px",
                          }}
                        />
                      </td>
                      <td>{book.tenSach}</td>
                      <td>{book.maTacGia}</td>
                      <td>{book.maTheLoai}</td>
                      <td>{book.maNXB}</td>
                      <td>{book.namXB}</td>
                      <td>{book.soLuong}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="action-sidebar">
            <div className="info-box bg-the-loai">
              THỂ LOẠI<span>{stats.categories}</span>
            </div>
            <div className="info-box bg-nxb">
              NXB<span>{stats.publishers}</span>
            </div>
            <div className="info-box bg-so-luong">
              SỐ LƯỢNG<span>{stats.totalCount}</span>
            </div>
            <div className="d-grid gap-3 mt-4">
              <button className="btn btn-primary" onClick={handleAdd}>
                Thêm
              </button>
              <button className="btn btn-warning" onClick={handleUpdate}>
                Cập Nhật
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Xóa
              </button>
              <button className="btn btn-secondary" onClick={clearForm}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
