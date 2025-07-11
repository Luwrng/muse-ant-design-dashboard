import React from "react";
import { useState } from "react";
import "./GPostDetailModal.css";

function GPostDetailModal({ post, isOpen, onClose, onEdit, onDisable }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="gpdetail-overlay" onClick={onClose}>
      <div className="gpdetail-popup" onClick={(e) => e.stopPropagation()}>
        <div className="gpdetail-header">
          <h2 className="gpdetail-title">Chi tiết bài viết</h2>
          <button className="gpdetail-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="gpdetail-content">
          {/* Replace the gpdetail-image-section with this: */}
          <div className="gpdetail-media-section">
            <div className="gpdetail-media-slider">
              <div
                className="gpdetail-media-container"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Video slide */}
                {post?.video && (
                  <div className="gpdetail-media-slide">
                    <video
                      src={post.video}
                      className="gpdetail-media-item"
                      controls={false}
                      poster={
                        post?.image || "/placeholder.svg?height=300&width=400"
                      }
                    />
                    <div className="gpdetail-play-button">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                      >
                        <circle
                          cx="30"
                          cy="30"
                          r="30"
                          fill="rgba(255,255,255,0.9)"
                        />
                        <path d="M25 20L40 30L25 40V20Z" fill="#333" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Image slides */}
                {post?.images?.map((image, index) => (
                  <div key={index} className="gpdetail-media-slide">
                    <img
                      src={image || "/placeholder.svg?height=300&width=400"}
                      alt={`${post?.title} - Image ${index + 1}`}
                      className="gpdetail-media-item"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation arrows */}
              {(post?.images?.length > 0 || post?.video) && (
                <>
                  <button
                    className="gpdetail-nav-arrow gpdetail-nav-prev"
                    onClick={() =>
                      setCurrentSlide((prev) =>
                        prev === 0
                          ? (post?.images?.length || 0) +
                            (post?.video ? 1 : 0) -
                            1
                          : prev - 1
                      )
                    }
                  >
                    ‹
                  </button>
                  <button
                    className="gpdetail-nav-arrow gpdetail-nav-next"
                    onClick={() =>
                      setCurrentSlide((prev) =>
                        prev ===
                        (post?.images?.length || 0) + (post?.video ? 1 : 0) - 1
                          ? 0
                          : prev + 1
                      )
                    }
                  >
                    ›
                  </button>
                </>
              )}

              {/* Dots indicator */}
              <div className="gpdetail-dots-container">
                {Array.from({
                  length: (post?.images?.length || 0) + (post?.video ? 1 : 0),
                }).map((_, index) => (
                  <button
                    key={index}
                    className={`gpdetail-dot ${
                      currentSlide === index ? "active" : ""
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="gpdetail-info-section">
            <h3 className="gpdetail-post-title">{post?.title}</h3>
            <p className="gpdetail-description">{post?.description}</p>

            <div className="gpdetail-meta">
              <div className="gpdetail-status">
                <span
                  className={`gpdetail-status-badge ${
                    post?.status === "Đang bán" ? "active" : "inactive"
                  }`}
                >
                  {post?.status}
                </span>
              </div>

              <div className="gpdetail-rating">
                <div className="gpdetail-stars">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`gpdetail-star ${
                        i < (post?.rating || 0) ? "filled" : ""
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="gpdetail-rating-value">{post?.rating}</span>
              </div>

              <div className="gpdetail-date">
                <span>Ngày tạo: {post?.createdDate}</span>
              </div>
            </div>

            <div className="gpdetail-product-section">
              <div className="gpdetail-product-info-card">
                <div className="gpdetail-product-info-header">
                  <span className="gpdetail-product-info-icon">📦</span>
                  <h4>Thông tin sản phẩm</h4>
                </div>

                <div className="gpdetail-product-info-content">
                  <div className="gpdetail-product-info-row">
                    <span className="gpdetail-product-info-label">
                      Tên sản phẩm:
                    </span>
                    <span className="gpdetail-product-info-value">
                      {post?.productName || "Cà chua cherry đỏ"}
                    </span>
                  </div>

                  <div className="gpdetail-product-info-row">
                    <span className="gpdetail-product-info-label">
                      Giá bán:
                    </span>
                    <span className="gpdetail-product-info-value gpdetail-price">
                      {post?.price || "50,000đ/kg"}
                    </span>
                  </div>

                  <div className="gpdetail-product-info-row">
                    <span className="gpdetail-product-info-label">
                      Đơn vị bán:
                    </span>
                    <span className="gpdetail-product-info-value">
                      {post?.unit || "kg"}
                    </span>
                  </div>

                  <div className="gpdetail-product-info-row">
                    <span className="gpdetail-product-info-label">
                      Ngày thu hoạch:
                    </span>
                    <span className="gpdetail-product-info-value">
                      {post?.harvestDate || "01/01/2025"}
                    </span>
                  </div>

                  <div className="gpdetail-product-info-row">
                    <span className="gpdetail-product-info-label">
                      Danh mục:
                    </span>
                    <span className="gpdetail-product-info-value">
                      {post?.category || "Rau củ quả"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gpdetail-actions">
          <button className="gpdetail-btn gpdetail-btn-edit" onClick={onEdit}>
            Chỉnh sửa
          </button>
          <button
            className="gpdetail-btn gpdetail-btn-disable"
            onClick={onDisable}
          >
            Ẩn bài viết
          </button>
        </div>
      </div>
    </div>
  );
}

export default GPostDetailModal;
