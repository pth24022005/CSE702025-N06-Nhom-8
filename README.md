#  Hệ thống Quản lý Thư viện

Đây là dự án đồ án xây dựng một ứng dụng web quản lý thư viện, sử dụng kiến trúc Single Page Application (SPA) với React.js.

## 👥 Thành viên Nhóm

- **Phạm Thanh Hải** - 23010677
- **Cao Thanh Thảo** - 23010168
- **Ngô Minh Hiếu** - 23010503
- **Mai Huy Thành** - 23010182

## 🚀 Mô tả Dự án

Hệ thống Quản lý Thư viện được thiết kế nhằm tự động hóa và đơn giản hóa các công việc quản lý truyền thống trong thư viện. Mục tiêu của dự án là cung cấp một công cụ mạnh mẽ, trực quan cho thủ thư để quản lý sách, độc giả, nhân viên và theo dõi các hoạt động mượn trả. Ứng dụng giúp tiết kiệm thời gian, giảm thiểu sai sót và tăng hiệu quả vận hành chung của thư viện.

## ✨ Các Chức năng Chính

Hệ thống bao gồm các module quản lý toàn diện:

- **Xác thực người dùng:**
  - Giao diện đăng nhập an toàn để phân quyền truy cập.

- **Trang chủ (Dashboard):**
  - Hiển thị các số liệu thống kê tổng quan một cách trực quan (tổng lượt mượn, sách đã trả/chưa trả...).

- **Quản lý Sách (Toàn diện):**
  - Chức năng CRUD (Thêm, Sửa, Xóa) cho thông tin chi tiết của từng cuốn sách.
  - Hỗ trợ upload và xem trước ảnh bìa sách.
  - Các module quản lý con: Tác giả, Thể loại, và Nhà xuất bản.

- **Quản lý Người dùng:**
  - Quản lý thông tin Độc giả (CRUD).
  - Quản lý thông tin Nhân viên (CRUD).

- **Nghiệp vụ Mượn/Trả:**
  - Giao diện chuyên biệt để tạo và quản lý phiếu mượn sách.
  - Giao diện xử lý trả sách, cập nhật trạng thái phiếu mượn và ghi chú.

- **Báo cáo & Thống kê:**
  - Hiển thị danh sách chi tiết các phiếu mượn.
  - Cung cấp các bộ lọc động theo trạng thái (Đã trả, Chưa trả, Tất cả).

## 🛠️ Công nghệ sử dụng

- **Nền tảng Frontend:**
  - **React.js (v18+):** Thư viện chính để xây dựng giao diện người dùng dựa trên kiến trúc component.
  - **React Router DOM (v6):** Xử lý việc điều hướng phía client, tạo ra trải nghiệm SPA mượt mà.

- **Ngôn ngữ:**
  - **JavaScript (ES6+):** Ngôn ngữ lập trình chính.
  - **HTML5 & CSS3:** Xây dựng cấu trúc và định dạng giao diện.

- **UI Framework & Thư viện:**
  - **Bootstrap 5:** Sử dụng hệ thống Grid và các component có sẵn để xây dựng giao diện nhanh chóng và responsive.
  - **Font Awesome:** Cung cấp bộ icon đa dạng và sắc nét.

- **Môi trường & Công cụ Phát triển:**
  - **Vite:** Công cụ build và server phát triển thế hệ mới, cho trải nghiệm lập trình nhanh và hiệu quả.
  - **Node.js:** Môi trường chạy JavaScript.
  - **Yarn/NPM:** Trình quản lý các gói và thư viện của dự án.
