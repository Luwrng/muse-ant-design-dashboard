import React, { useEffect } from "react";
import { useState } from "react";
import GPostDetailModal from "./GPostDetailModal";
import GDisableConfirmModal from "./GDisableConfirmModal";
import GCreatePostModal from "./GCreatePostModal";
import GUpdatePostModal from "./GUpdatePostModal";

import productService from "../../services/apiServices/productService";

import "./GPostPage.css";
import postService from "../../services/apiServices/postService";

function GPostPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("ACTIVE");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);

  // const [filterPosts, setFilterPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [productList, setProducts] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // #region Fetching data
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (currentPage) => {
    try {
      const gardenerId = localStorage.getItem("account_id");
      const gardenerProducts = await productService.getGardenerProducts(
        gardenerId
      );
      setProducts(gardenerProducts.items);

      const gardenerPosts = await postService.getGardenerPosts(
        gardenerId,
        currentPage,
        10,
        "Status"
      );
      setPosts(gardenerPosts);
      setTotalPages(gardenerPosts.totalPages);
      setTotalResults(gardenerPosts.total);
    } catch (err) {
      console.log(err);
    }
  };
  // #endregion

  const filterTabs = [
    { id: "all", label: "Hoạt động", count: 2 },
    { id: "expired", label: "Ngưng hoạt động" },
    { id: "banned", label: "Bị cấm" },
  ];

  const validPosts = Array.isArray(posts) ? posts : [];

  const filteredPosts =
    activeFilter === "ACTIVE"
      ? validPosts
      : validPosts.filter((post) => post.status === activeFilter);

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

  const handleUpdate = async (updatedPost) => {
    try {
      await postService.updatePost(updatedPost.postId, {
        title: updatedPost.title,
        content: updatedPost.content,
      });

      setPosts(
        posts.map((post) =>
          post.postId === updatedPost.postId ? updatedPost : post
        )
      );
    } catch (err) {
      console.log(err);
    }

    setShowUpdatePopup(false);
  };

  const handleCreate = async (newPostData) => {
    try {
      const newPost = {
        id: posts.length + 1,
        title: newPostData.title,
        content: newPostData.content,
        harvestDate: new Date().toLocaleDateString("vi-VN"),
        postEndDate: new Date().toLocaleDateString("vi-VN"),
        productId: newPostData.productId,
        gardenerId: newPostData.gardenerId,
        postMediaDTOs: newPostData.postMediaDTOs,
      };

      await postService.createPost(newPost.gardenerId, newPost);
      await fetchData(1);
    } catch (err) {
      console.log(err);
    } finally {
      setShowCreatePopup(false);
    }
  };

  const handleConfirmDisable = async () => {
    try {
      const updatedStatus =
        selectedPost.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await postService.changePostStatus(selectedPost.postId, updatedStatus);

      setPosts(
        posts.map((post) =>
          post.postId === selectedPost.id
            ? { ...post, status: updatedStatus }
            : post
        )
      );
    } catch (err) {
      console.log(err);
    }

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
                key={tab.id}
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
        {Array.isArray(filteredPosts) &&
          filteredPosts.map((article) => (
            <div
              key={article.postId}
              className="gpost-article-card"
              onClick={() => handlePostClick(article)}
            >
              <div className="gpost-article-image">
                <img
                  src={article.thumbNail || "/placeholder.svg"}
                  alt={article.title}
                />
                {/* <button className="gpost-bookmark-btn">⋯</button> */}
              </div>
              <div className="gpost-article-content">
                <h3 className="gpost-article-title">{article.title}</h3>
                <p className="gpost-article-description">{article.content}</p>
                <div className="gpost-article-meta">
                  <span className="gpost-status">{article.status}</span>
                  <div className="gpost-rating">
                    {renderStars(article.rating)}
                    <span className="gpost-rating-value">{article.rating}</span>
                  </div>
                </div>
                <div className="gpost-article-date">
                  Ngày tạo: {article.createdAt}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="gorder-pagination">
          <div className="gorder-pagination-info">
         
          </div>
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
      {selectedPost && (
        <GPostDetailModal
          postId={selectedPost.postId}
          isOpen={showDetailPopup}
          onClose={() => setShowDetailPopup(false)}
          onEdit={handleEdit}
          onDisable={handleDisable}
        />
      )}
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
        post={selectedPost}
        isOpen={showDisablePopup}
        onClose={() => setShowDisablePopup(false)}
        onConfirm={handleConfirmDisable}
      />
    </div>
  );
}

export default GPostPage;
