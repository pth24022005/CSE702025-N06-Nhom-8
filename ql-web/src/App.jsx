// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./components/MainLayout.jsx";

// Pages - Chỉ import các trang đã được xây dựng
import LoginForm from "./pages/LoginForm.jsx";
import HomePage from "./pages/HomePage.jsx";
import BookManagement from "./pages/BookManagement.jsx";
import ReaderManagement from "./pages/ReaderManagement.jsx";
import BorrowReturn from "./pages/BorrowReturn.jsx";
import StaffManagement from "./pages/StaffManagement.jsx";
import Reports from "./pages/Reports.jsx";

// Pages con BookManagement
import BookInfo from "./pages/BookInfo.jsx";
import AuthorInfo from "./pages/AuthorInfo.jsx";
import CategoryInfo from "./pages/CategoryInfo.jsx";
import PublisherInfo from "./pages/PublisherInfo.jsx";

// Pages con BorrowReturn
import BorrowBook from "./pages/BorrowBook.jsx";
import ReturnBook from "./pages/ReturnBook.jsx";
// ... import các trang con khác nếu cần

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Các route bên trong layout chính */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/quan-ly-sach" element={<BookManagement />} />
        <Route path="/doc-gia" element={<ReaderManagement />} />
        <Route path="/muon-tra" element={<BorrowReturn />} />
        <Route path="/nhan-vien" element={<StaffManagement />} />
        <Route path="/bao-cao" element={<Reports />} />

        {/* Route cho trang con quản lý sách */}
        <Route path="/quan-ly-sach/thong-tin" element={<BookInfo />} />
        <Route path="/quan-ly-sach/tac-gia" element={<AuthorInfo />} />
        <Route path="/quan-ly-sach/the-loai" element={<CategoryInfo />} />
        <Route path="/quan-ly-sach/nha-xuat-ban" element={<PublisherInfo />} />

        {/* Route cho trang con BorrowReturn */}
        <Route path="/muon-tra/muon-sach" element={<BorrowBook />} />
        <Route path="/muon-tra/tra-sach" element={<ReturnBook />} />
      </Route>

      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default App;
