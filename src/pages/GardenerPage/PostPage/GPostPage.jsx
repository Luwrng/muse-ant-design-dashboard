import React, { useEffect } from "react";
import { useState } from "react";
import GPostDetailModal from "./GPostDetailModal";
import GDisableConfirmModal from "./GDisableConfirmModal";
import GCreatePostModal from "./GCreatePostModal";
import GUpdatePostModal from "./GUpdatePostModal";
import Paginate from "../../../components/paginate/Paginate";

import productService from "../../services/apiServices/productService";

import "./GPostPage.css";
import postService from "../../services/apiServices/postService";

function GPostPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);

  const [posts, setPosts] = useState([]);
  const [productList, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("ACTIVE");

  //Paginate variable
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalResult, setTotalResult] = useState();

  // #region Fetching data
  useEffect(() => {
    const fetchProducts = async () => {
      const gardenerId = localStorage.getItem("account_id");
      const result = await productService.getAllGardenerProducts(
        gardenerId,
        true
      );
      setProducts(result);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, activeFilter]);

  const fetchData = async () => {
    try {
      const gardenerId = localStorage.getItem("account_id");
      const gardenerPosts = await postService.getGardenerPosts(
        gardenerId,
        currentPage,
        10,
        "Status",
        activeFilter,
        searchTerm
      );
      setPosts(gardenerPosts.items);
      setTotalPage(gardenerPosts.totalPages);
      setTotalResult(gardenerPosts.total);
    } catch (err) {
      console.log(err);
    }
  };
  // #endregion

  const filterTabs = [
    { id: "ACTIVE", label: "Hoạt động" },
    { id: "INACTIVE", label: "Ngưng hoạt động" },
    { id: "BANNED", label: "Bị cấm" },
  ];

  const translateStatus = (status) => {
    switch (status) {
      case "ACTIVE":
        return "Hoạt động";
      case "INACTIVE":
        return "Ngưng hoạt động";
      case "BANNED":
        return "Bị cấm";
      default:
        return status; // fallback nếu không khớp
    }
  };

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
        title: newPostData.title,
        content: newPostData.content,
        harvestDate: newPostData.harvestDate,
        postEndDate: newPostData.postEndDate,
        productId: newPostData.productId,
        gardenerId: newPostData.gardenerId,
        postMediaDTOs: newPostData.postMediaDTOs,
      };

      // console.log(newPostData.postMediaDTOs);

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

  const SearchIcon = () => (
    <svg
      className="gpost-icon gpost-search-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
  );

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
                  activeFilter === tab.id ? "active" : ""
                }`}
                onClick={() => handleFilterChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="gpost-search-filter-tabs">
            <div className="gpost-search-container">
              <SearchIcon className="gpost-search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết theo tiêu đề ..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchTerm(searchInput); // this triggers the real search
                    setCurrentPage(1); // reset pagination
                  }
                }}
                className="gpost-search-input"
              />
            </div>
            {/* <div className="gpost-sort-options">Bộ lọc</div> */}
          </div>
        </div>
      </div>

      <div className="gpost-articles-grid">
        {Array.isArray(posts) &&
          posts.map((article) => (
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
                <p className="gpost-article-description">
                  {/* {article.content} */}
                  <div dangerouslySetInnerHTML={{ __html: article?.content }} />
                </p>
                <div className="gpost-article-meta">
                  <span
                    className={`gpost-status-${article.status.toLowerCase()}`}
                  >
                    {translateStatus(article.status)}
                  </span>
                  <div className="gpost-rating">
                    {renderStars(article.rating)}
                    <span className="gpost-rating-value">{article.rating}</span>
                  </div>
                </div>
                <div className="gpost-article-date">
                  Ngày tạo:{" "}
                  {new Date(article.createdAt).toISOString().split("T")[0]}
                </div>
              </div>
            </div>
          ))}
      </div>

      <Paginate
        currentPage={currentPage}
        totalPages={totalPage}
        totalResults={totalResult}
        onPageChange={handlePageChange}
      />

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
