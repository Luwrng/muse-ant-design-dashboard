import React from "react";
import { useState } from "react";
import "./GPostPage.css";

function GPostPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);

  const posts = [
    {
      id: 1,
      title: "Backend API với Node.js và Express",
      description:
        "Xây dựng API backend mạnh mẽ và bảo mật với Node.js và Express framework",
      status: "Đang bán",
      rating: 4.7,
      date: "18/9/2024",
      image: "/placeholder.svg?height=200&width=300",
      category: "backend",
    },
    {
      id: 2,
      title: "Tối ưu hóa hiệu suất website",
      description:
        "Các kỹ thuật và công cụ để tối ưu hóa tốc độ tải và hiệu suất của website",
      status: "Hết hạn",
      rating: 4.3,
      date: "12/9/2024",
      image: "/placeholder.svg?height=200&width=300",
      category: "optimization",
    },
    {
      id: 3,
      title: "Phát triển ứng dụng di động với React Native",
      description:
        "Hướng dẫn từ cơ bản đến nâng cao về phát triển ứng dụng di động bằng React Native",
      status: "Đang bán",
      rating: 4.6,
      date: "8/9/2024",
      image: "/placeholder.svg?height=200&width=300",
      category: "mobile",
    },
    {
      id: 4,
      title: "JavaScript ES6+ và các tính năng mới",
      description:
        "Tìm hiểu về các tính năng mới nhất của JavaScript và cách sử dụng chúng hiệu quả",
      status: "Hết hạng",
      rating: 4.2,
      date: "10/9/2024",
      image: "/placeholder.svg?height=200&width=300",
      category: "javascript",
    },
    {
      id: 5,
      title: "Thiết kế giao diện người dùng hiện đại",
      description:
        "Khám phá các nguyên tắc thiết kế UI/UX hiện đại và cách áp dụng vào dự án thực tế",
      status: "Đang bán",
      rating: 4.8,
      date: "20/9/2024",
      image: "/placeholder.svg?height=200&width=300",
      category: "design",
    },
    {
      id: 6,
      title: "Hướng dẫn React cho người mới bắt đầu",
      description:
        "Một hướng dẫn chi tiết về React dành cho những người mới bắt đầu học lập trình web",
      status: "Đang bán",
      rating: 4.5,
      date: "15/9/2024",
      image: "/placeholder.svg?height=200&width=300",
      category: "react",
    },
  ];

  const filterTabs = [
    { id: "all", label: "Tất cả", count: 6 },
    { id: "draft", label: "Đang bán" },
    { id: "expired", label: "Hết hạng" },
  ];

  const filteredPost =
    activeFilter === "Tất cả"
      ? posts
      : posts.filter((post) => post.status === activeFilter);

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`gpost-star ${
          index < Math.floor(rating) ? "gpost-filled" : ""
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="gpost-article-management">
      <div className="gpost-header">
        <div className="gpost-title-section">
          <h1>Quản lý bài viết</h1>
        </div>

        <div className="gpost-header-actions">
          <button className="gpost-create-btn">+ Tạo bài viết</button>
        </div>
      </div>

      <div className="gpost-tabs-container">
        {/* Filter Tabs */}
        <div className="gpost-filter-tabs">
          <div className="gpost-filter-tabs-options">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                className={`gpost-filter-tab ${
                  activeFilter === tab.label ? "active" : ""
                }`}
                onClick={() => handleFilterChange(tab.label)}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="gpost-search-filter-tabs">
            <div className="gpost-search-container">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="gpost-search-input"
              />
            </div>
            {/* <div className="gpost-sort-options">Bộ lọc</div> */}
          </div>
        </div>
      </div>

      <div className="gpost-articles-grid">
        {filteredPost.map((article) => (
          <div key={article.id} className="gpost-article-card">
            <div className="gpost-article-image">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
              />
              <button className="gpost-bookmark-btn">⋯</button>
            </div>
            <div className="gpost-article-content">
              <h3 className="gpost-article-title">{article.title}</h3>
              <p className="gpost-article-description">{article.description}</p>
              <div className="gpost-article-meta">
                <span className="gpost-status">{article.status}</span>
                <div className="gpost-rating">
                  {renderStars(article.rating)}
                  <span className="gpost-rating-value">{article.rating}</span>
                </div>
              </div>
              <div className="gpost-article-date">Ngày tạo: {article.date}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="gpost-pagination">
        <span className="gpost-pagination-info">
          Hiển thị từ 1 đến 6 trong tổng số XX kết quả
        </span>
        <div className="gpost-pagination-controls">
          <button className="gpost-pagination-btn">‹</button>
          {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
            <button
              key={index}
              className={`gpost-pagination-btn ${
                page === 1 ? "gpost-active" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button className="gpost-pagination-btn">›</button>
        </div>
      </div>
    </div>
  );
}

export default GPostPage;
