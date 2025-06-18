// src/pages/StaffManagement.jsx
import React, { useState } from "react";

// Import file CSS "riêng" của trang này
import "../assets/css/StaffManagement.css";

// Dữ liệu mẫu ban đầu
const initialEmployees = [
  {
    maNhanVien: "MaNV01",
    tenNhanVien: "Nguyễn Cảnh Vinh",
    gioiTinh: "Nam",
    diaChi: "Nghệ An",
    sdt: "372651619",
    chucVu: "Quản Lý",
    image: "https://i.imgur.com/8ePAA6G.png",
  },
  {
    maNhanVien: "MaNV02",
    tenNhanVien: "Hùng",
    gioiTinh: "Nam",
    diaChi: "Hà Nội",
    sdt: "123456789",
    chucVu: "Nhân Viên",
    image: "https://i.imgur.com/JzaT5wg.png",
  },
];

const emptyFormState = {
  maNhanVien: "",
  tenNhanVien: "",
  gioiTinh: "",
  diaChi: "",
  sdt: "",
  chucVu: "",
  image: "",
};

const StaffManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [formData, setFormData] = useState(emptyFormState);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

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
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRowClick = (emp) => {
    setSelectedEmployeeId(emp.maNhanVien);
    setFormData(emp);
    setImagePreview(emp.image || "");
  };

  const clearForm = () => {
    setFormData(emptyFormState);
    setSelectedEmployeeId(null);
    setImagePreview("");
    if (document.getElementById("file-upload")) {
      document.getElementById("file-upload").value = "";
    }
  };

  const handleAdd = () => {
    if (!formData.maNhanVien || !formData.tenNhanVien) {
      alert("Mã và Tên Nhân Viên là bắt buộc!");
      return;
    }
    if (employees.some((emp) => emp.maNhanVien === formData.maNhanVien)) {
      alert("Mã nhân viên đã tồn tại!");
      return;
    }
    const newEmployee = {
      ...formData,
      image:
        formData.image || `https://i.pravatar.cc/150?u=${formData.maNhanVien}`,
    };
    setEmployees((prev) => [...prev, newEmployee]);
    alert("Thêm nhân viên thành công!");
    clearForm();
  };

  const handleUpdate = () => {
    if (!selectedEmployeeId) {
      alert("Vui lòng chọn nhân viên để cập nhật!");
      return;
    }
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.maNhanVien === selectedEmployeeId ? formData : emp
      )
    );
    alert("Cập nhật thành công!");
    clearForm();
  };

  const handleDelete = () => {
    if (!selectedEmployeeId) {
      alert("Vui lòng chọn nhân viên để xóa!");
      return;
    }
    if (
      window.confirm(
        `Bạn có chắc muốn xóa nhân viên "${formData.tenNhanVien}"?`
      )
    ) {
      setEmployees((prev) =>
        prev.filter((emp) => emp.maNhanVien !== selectedEmployeeId)
      );
      alert("Xóa thành công!");
      clearForm();
    }
  };

  return (
    <div className="container-fluid content-container">
      <h3 className="mb-4">QUẢN LÝ NHÂN VIÊN</h3>
      <div className="row">
        <div className="col-lg-9">
          <div className="form-section p-4 bg-white shadow-sm rounded">
            <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
              <div className="col-md-3">
                <div className="image-uploader border rounded d-flex justify-content-center align-items-center">
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
                      <div className="upload-prompt text-center">
                        <i className="fa-solid fa-camera fa-2x mb-2"></i>
                        <span>Tải ảnh lên</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div className="col-md-9">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="maNhanVien" className="form-label">
                      Mã Nhân Viên *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="maNhanVien"
                      value={formData.maNhanVien}
                      onChange={handleInputChange}
                      readOnly={!!selectedEmployeeId}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="diaChi" className="form-label">
                      Địa Chỉ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="diaChi"
                      value={formData.diaChi}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="tenNhanVien" className="form-label">
                      Họ Tên *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tenNhanVien"
                      value={formData.tenNhanVien}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="sdt" className="form-label">
                      SĐT
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="sdt"
                      value={formData.sdt}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gioiTinh" className="form-label">
                      Giới Tính
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="gioiTinh"
                      value={formData.gioiTinh}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="chucVu" className="form-label">
                      Chức Vụ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="chucVu"
                      value={formData.chucVu}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="table-section mt-4 bg-white shadow-sm rounded p-3">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th>Mã NV</th>
                    <th>Ảnh</th>
                    <th>Tên NV</th>
                    <th>Giới Tính</th>
                    <th>Địa Chỉ</th>
                    <th>SĐT</th>
                    <th>Chức Vụ</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr
                      key={emp.maNhanVien}
                      onClick={() => handleRowClick(emp)}
                      className={
                        selectedEmployeeId === emp.maNhanVien
                          ? "table-active"
                          : ""
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td>{emp.maNhanVien}</td>
                      <td>
                        <img src={emp.image} alt={emp.tenNhanVien} />
                      </td>
                      <td>{emp.tenNhanVien}</td>
                      <td>{emp.gioiTinh}</td>
                      <td>{emp.diaChi}</td>
                      <td>{emp.sdt}</td>
                      <td>{emp.chucVu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="action-sidebar d-grid gap-3">
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
  );
};

export default StaffManagement;
