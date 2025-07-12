import React from "react";
import { useState } from "react";
import GPostDetailModal from "./GPostDetailModal";
import GDisableConfirmModal from "./GDisableConfirmModal";
import GCreatePostModal from "./GCreatePostModal";
import GUpdatePostModal from "./GUpdatePostModal";
import "./GPostPage.css";

function GPostPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Backend API với Node.js và Express",
      description:
        "Xây dựng API backend mạnh mẽ và bảo mật với Node.js và Express framework",
      image: "/placeholder.svg?height=200&width=300",
      video: "/placeholder-video.mp4", // Add video
      images: [
        // Add multiple images
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      status: "Đang bán",
      rating: 4.7,
      createdDate: "18/9/2024",
      productName: "Cà chua cherry đỏ",
      price: "50,000đ/kg",
      unit: "kg",
      harvestDate: "01/01/2025",
      category: "Rau củ quả",
      products: [
        {
          id: 1,
          name: "Node.js Course",
          image: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 2,
          name: "Express Guide",
          image: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      id: 2,
      title: "Tối ưu hóa hiệu suất website",
      description:
        "Các kỹ thuật và công cụ để tối ưu tốc độ tải và hiệu suất của website",
      image: "/placeholder.svg?height=200&width=300",
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      status: "Hết hàng",
      rating: 4.3,
      createdDate: "12/9/2024",
      productName: "Hướng dẫn tối ưu website",
      price: "75,000đ",
      unit: "bộ",
      harvestDate: "15/12/2024",
      category: "Khóa học",
      products: [],
    },
  ]);

  const [productList] = useState([
    {
      id: 1,
      name: "Node.js Course",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Express Guide",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "React Native App",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "JavaScript ES6+",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]);

  const filterTabs = [
    { id: "all", label: "Tất cả", count: 2 },
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

  //Function handler
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowDetailPopup(true);
  };

  const handleEdit = () => {
    setShowDetailPopup(false);
    setShowUpdatePopup(true);
  };

  const handleDisable = () => {
    setShowDetailPopup(false);
    setShowDisablePopup(true);
  };

  const handleUpdate = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setShowUpdatePopup(false);
  };

  const handleCreate = (newPostData) => {
    const newPost = {
      id: posts.length + 1,
      title: newPostData.title,
      description: newPostData.content,
      image: "/placeholder.svg?height=200&width=300",
      status: "Đang bán",
      rating: 0,
      createdDate: new Date().toLocaleDateString("vi-VN"),
      productName: "New Product",
      price: "100,000đ",
      unit: "kg",
      harvestDate: new Date().toLocaleDateString("vi-VN"),
      category: "Unknown",
      products: productList.filter((product) =>
        newPostData.selectedProducts.includes(product.id)
      ),
    };
    setPosts([...posts, newPost]);
    setShowCreatePopup(false);
  };

  const handleConfirmDisable = () => {
    setPosts(
      posts.map((post) =>
        post.id === selectedPost.id ? { ...post, status: "Đã ẩn" } : post
      )
    );
    setShowDisablePopup(false);
    setSelectedPost(null);
  };

  return (
    <div className="gpost-article-management">
      <div className="gpost-header">
        <div className="gpost-title-section">
          <h1>Quản lý bài viết</h1>
        </div>

        <div className="gpost-header-actions">
          <button
            className="gpost-create-btn"
            onClick={() => setShowCreatePopup(true)}
          >
            + Tạo bài viết
          </button>
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
          <div
            key={article.id}
            className="gpost-article-card"
            onClick={() => handlePostClick(article)}
          >
            <div className="gpost-article-image">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
              />
              {/* <button className="gpost-bookmark-btn">⋯</button> */}
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
      {/* Post Detail Popup */}
      <GPostDetailModal
        post={selectedPost}
        isOpen={showDetailPopup}
        onClose={() => setShowDetailPopup(false)}
        onEdit={handleEdit}
        onDisable={handleDisable}
      />
      {/* Create Post Popup */}
      <GCreatePostModal
        isOpen={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        onCreate={handleCreate}
        productList={productList}
      />
      {/* Update Post Popup */}
      <GUpdatePostModal
        post={selectedPost}
        isOpen={showUpdatePopup}
        onClose={() => setShowUpdatePopup(false)}
        onUpdate={handleUpdate}
      />
      {/* Disable Post Popup */}
      <GDisableConfirmModal
        isOpen={showDisablePopup}
        onClose={() => setShowDisablePopup(false)}
        onConfirm={handleConfirmDisable}
      />
    </div>
  );
}

export default GPostPage;
