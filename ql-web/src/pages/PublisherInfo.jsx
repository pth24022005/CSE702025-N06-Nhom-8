// src/pages/PublisherInfo.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../assets/css/PublisherInfo.css";

const initialPublishers = [
  {
    maNXB: "NXB01",
    tenNXB: "NXB Kim Đồng",
    diaChi: "Hà Nội",
    sdt: "0123456789",
  },
  {
    maNXB: "NXB02",
    tenNXB: "NXB Trẻ",
    diaChi: "TP. Hồ Chí Minh",
    sdt: "0987654321",
  },
  {
    maNXB: "NXB03",
    tenNXB: "NXB Giáo Dục",
    diaChi: "Hà Nội",
    sdt: "02438220955",
  },
];

const emptyFormState = { maNXB: "", tenNXB: "", diaChi: "", sdt: "" };

const PublisherInfo = () => {
  const [publishers, setPublishers] = useState(initialPublishers);
  const [formData, setFormData] = useState(emptyFormState);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("id");

  const filteredPublishers = useMemo(() => {
    if (!searchTerm) return publishers;
    return publishers.filter((p) => {
      const term = searchTerm.toLowerCase();
      const valueToSearch = (searchBy === "id" ? p.maNXB : p.tenNXB) || "";
      return valueToSearch.toLowerCase().includes(term);
    });
  }, [publishers, searchTerm, searchBy]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRowClick = (publisher) => {
    setSelectedId(publisher.maNXB);
    setFormData(publisher);
  };

  const clearForm = () => {
    setFormData(emptyFormState);
    setSelectedId(null);
  };

  const handleSave = () => {
    if (!formData.maNXB) {
      alert("Mã NXB là bắt buộc!");
      return;
    }
    if (selectedId) {
      // Chế độ Sửa
      setPublishers((prev) =>
        prev.map((p) => (p.maNXB === selectedId ? formData : p))
      );
      alert("Cập nhật NXB thành công!");
    } else {
      // Chế độ Thêm
      if (publishers.some((p) => p.maNXB === formData.maNXB)) {
        alert("Mã NXB đã tồn tại!");
        return;
      }
      setPublishers((prev) => [...prev, formData]);
      alert("Thêm NXB thành công!");
    }
    clearForm();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">THÔNG TIN NHÀ XUẤT BẢN</h3>
        <Link to="/quan-ly-sach" className="btn btn-outline-secondary">
          <i className="fa-solid fa-arrow-left me-2"></i>Quay lại
        </Link>
      </div>
      <div className="row g-4">
        <div className="col-md-5">
          <div className="search-container p-4 bg-white shadow-sm rounded mb-4">
            <h5 className="mb-3">Tìm kiếm NXB</h5>
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
                <label htmlFor="maNXB" className="form-label">
                  Mã NXB *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="maNXB"
                  value={formData.maNXB}
                  onChange={handleInputChange}
                  readOnly={!!selectedId}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tenNXB" className="form-label">
                  Tên NXB
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tenNXB"
                  value={formData.tenNXB}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="diaChi" className="form-label">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="diaChi"
                  value={formData.diaChi}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
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
                    <th>Mã NXB</th>
                    <th>Tên NXB</th>
                    <th>Địa Chỉ</th>
                    <th>SĐT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPublishers.map((p) => (
                    <tr
                      key={p.maNXB}
                      onClick={() => handleRowClick(p)}
                      className={selectedId === p.maNXB ? "table-primary" : ""}
                    >
                      <td>{p.maNXB}</td>
                      <td>{p.tenNXB}</td>
                      <td>{p.diaChi}</td>
                      <td>{p.sdt}</td>
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

export default PublisherInfo;
