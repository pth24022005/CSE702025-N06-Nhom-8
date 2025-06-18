// src/pages/Reports.jsx
import React, { useState, useMemo } from "react";
import "../assets/css/Reports.css";

const initialBorrows = [
  {
    maPhieu: "PM01",
    soThe: "ST01",
    tenDocGia: "Nguyễn Khả Nam",
    tenSach: "Sách Hay",
    sl: 1,
    ngayMuon: "01/01/2025",
    henTra: "15/01/2025",
    tinhTrang: "Đã Trả",
  },
  {
    maPhieu: "PM02",
    soThe: "ST02",
    tenDocGia: "Lê Văn Hiếu",
    tenSach: "Lập Trình Web",
    sl: 1,
    ngayMuon: "05/03/2025",
    henTra: "20/03/2025",
    tinhTrang: "Đã Trả",
  },
  {
    maPhieu: "PM03",
    soThe: "ST03",
    tenDocGia: "Trần Thị Mai",
    tenSach: "Tâm Lý Học",
    sl: 1,
    ngayMuon: "10/05/2025",
    henTra: "25/05/2025",
    tinhTrang: "Chưa Trả",
  },
  {
    maPhieu: "PM04",
    soThe: "ST01",
    tenDocGia: "Nguyễn Khả Nam",
    tenSach: "Đắc Nhân Tâm",
    sl: 1,
    ngayMuon: "01/06/2025",
    henTra: "15/06/2025",
    tinhTrang: "Chưa Trả",
  },
];

const Reports = () => {
  const [allBorrows] = useState(initialBorrows);
  const [filterType, setFilterType] = useState("all");

  const stats = useMemo(() => {
    return {
      total: allBorrows.length,
      returned: allBorrows.filter((item) => item.tinhTrang === "Đã Trả").length,
      notReturned: allBorrows.filter((item) => item.tinhTrang === "Chưa Trả")
        .length,
      uniqueBooks: new Set(allBorrows.map((item) => item.tenSach)).size,
      uniqueReaders: new Set(allBorrows.map((item) => item.soThe)).size,
    };
  }, [allBorrows]);

  const displayedBorrows = useMemo(() => {
    if (filterType === "returned")
      return allBorrows.filter((item) => item.tinhTrang === "Đã Trả");
    if (filterType === "not-returned")
      return allBorrows.filter((item) => item.tinhTrang === "Chưa Trả");
    return allBorrows;
  }, [allBorrows, filterType]);

  return (
    <>
      <h3 className="mb-4">THỐNG KÊ - BÁO CÁO</h3>
      {/* Các thẻ thống kê */}
      <div className="row g-4 mb-4">
        <div className="col-lg col-md-6">
          <div className="stat-card card-blue">
            <span>TỔNG LƯỢT MƯỢN</span>
            <h3>{stats.total}</h3>
          </div>
        </div>
        <div className="col-lg col-md-6">
          <div className="stat-card card-green">
            <span>SÁCH ĐÃ TRẢ</span>
            <h3>{stats.returned}</h3>
          </div>
        </div>
        <div className="col-lg col-md-6">
          <div className="stat-card card-red">
            <span>SÁCH CHƯA TRẢ</span>
            <h3>{stats.notReturned}</h3>
          </div>
        </div>
        <div className="col-lg col-md-6">
          <div className="stat-card card-purple">
            <span>ĐỘC GIẢ MƯỢN</span>
            <h3>{stats.uniqueReaders}</h3>
          </div>
        </div>
        <div className="col-lg col-md-6">
          <div className="stat-card card-pink">
            <span>ĐẦU SÁCH MƯỢN</span>
            <h3>{stats.uniqueBooks}</h3>
          </div>
        </div>
      </div>

      <div className="report-container p-4 bg-white shadow-sm rounded">
        <h5 className="mb-3 text-center">BÁO CÁO CHI TIẾT</h5>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Mã Phiếu</th>
                <th>Số Thẻ</th>
                <th>Tên Độc Giả</th>
                <th>Tên Sách</th>
                <th>SL</th>
                <th>Ngày Mượn</th>
                <th>Hẹn Trả</th>
                <th>Tình Trạng</th>
              </tr>
            </thead>
            <tbody>
              {displayedBorrows.length > 0 ? (
                displayedBorrows.map((item) => (
                  <tr key={item.maPhieu}>
                    <td>{item.maPhieu}</td>
                    <td>{item.soThe}</td>
                    <td>{item.tenDocGia}</td>
                    <td>{item.tenSach}</td>
                    <td>{item.sl}</td>
                    <td>{item.ngayMuon}</td>
                    <td>{item.henTra}</td>
                    <td
                      className={
                        item.tinhTrang === "Đã Trả"
                          ? "tinh-trang-da-tra"
                          : "tinh-trang-chua-tra"
                      }
                    >
                      {item.tinhTrang}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    Không có dữ liệu cho bộ lọc này.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ========================================================
           THAY ĐỔI: Di chuyển các nút xuống đây và dùng d-flex
           ======================================================== */}
        <div className="report-actions mt-4 d-flex justify-content-center gap-3">
          <button
            className={`btn ${
              filterType === "not-returned"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setFilterType("not-returned")}
          >
            DS Chưa Trả
          </button>
          <button
            className={`btn ${
              filterType === "returned" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setFilterType("returned")}
          >
            DS Đã Trả
          </button>
          <button
            className={`btn ${
              filterType === "all" ? "btn-secondary" : "btn-outline-secondary"
            }`}
            onClick={() => setFilterType("all")}
          >
            Xem tất cả
          </button>
        </div>
      </div>
    </>
  );
};

export default Reports;
