import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./GPostDetailModal.css";
import postService from "../../services/apiServices/postService";
import LoadingPopup from "../../../components/loading/LoadingPopup";

function GPostDetailModal({ postId, isOpen, onClose, onEdit, onDisable }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [playButton, setPlayButton] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const result = await postService.getPostDetail(postId);
        setCurrentPost(result);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (!isOpen) return null;

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const statusMap = {
    ACTIVE: "Hoạt Động",
    INACTIVE: "Ngưng họat động",
    BANNED: "Bị cấm",
  };

  return (
    <div className="gpdetail-overlay" onClick={onClose}>
      <div className="gpdetail-popup" onClick={(e) => e.stopPropagation()}>
        <div className="gpdetail-header">
          <h2 className="gpdetail-title">Chi tiết bài viết</h2>
          <button className="gpdetail-close" onClick={onClose}>
            ×
          </button>
        </div>

        {currentPost && (
          <div className="gpdetail-content">
            {/* Replace the gpdetail-image-section with this: */}
            <div className="gpdetail-media-section">
              <div className="gpdetail-media-slider">
                <div
                  className="gpdetail-media-container"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {/* Video slide */}
                  {currentPost?.video && (
                    <div className="gpdetail-media-slide" onClick={handlePlay}>
                      <video
                        ref={videoRef}
                        src={currentPost.video}
                        className="gpdetail-media-item"
                        controls={true}
                        poster={
                          currentPost?.thumbNail ||
                          "/placeholder.svg?height=300&width=400"
                        }
                      />
                      {/* <div className="gpdetail-play-button">
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
                    </div> */}
                    </div>
                  )}

                  {/* Image slides */}
                  {currentPost?.images?.map((image, index) => (
                    <div key={index} className="gpdetail-media-slide">
                      <img
                        src={image || "/placeholder.svg?height=300&width=400"}
                        alt={`${currentPost?.title} - ${index + 1}`}
                        className="gpdetail-media-item"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation arrows */}
                {(currentPost?.images?.length > 0 || currentPost?.video) && (
                  <>
                    <button
                      className="gpdetail-nav-arrow gpdetail-nav-prev"
                      onClick={() =>
                        setCurrentSlide((prev) =>
                          prev === 0
                            ? (currentPost?.images?.length || 0) +
                              (currentPost?.video ? 1 : 0) -
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
                          (currentPost?.images?.length || 0) +
                            (currentPost?.video ? 1 : 0) -
                            1
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
                    length:
                      (currentPost?.images?.length || 0) +
                      (currentPost?.video ? 1 : 0),
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
              <h3 className="gpdetail-post-title">{currentPost?.title}</h3>
              {/* <p className="gpdetail-description">{currentPost?.content}</p> */}
              <div dangerouslySetInnerHTML={{ __html: currentPost?.content }} />

              <div className="gpdetail-meta">
                <div className="gpdetail-status">
                  <span
                    className={`gpdetail-status-badge ${
                      currentPost?.postStatus === "ACTIVE"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {statusMap[currentPost?.postStatus]}
                  </span>
                </div>

                <div className="gpdetail-rating">
                  <div className="gpdetail-stars">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`gpdetail-star ${
                          i < (currentPost?.rating || 0) ? "filled" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="gpdetail-rating-value">
                    {currentPost?.rating}
                  </span>
                </div>

                <div className="gpdetail-date">
                  <span>
                    Ngày tạo:{" "}
                    {/* {new Date(currentPost?.createdAt).toISOString().split("T")[0]} */}
                    {currentPost?.createdAt}
                  </span>
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
                        {currentPost?.productData.productName}
                      </span>
                    </div>

                    <div className="gpdetail-product-info-row">
                      <span className="gpdetail-product-info-label">
                        Giá bán:
                      </span>
                      <span className="gpdetail-product-info-value gpdetail-price">
                        {currentPost?.productData?.price}
                      </span>
                    </div>

                    <div className="gpdetail-product-info-row">
                      <span className="gpdetail-product-info-label">
                        Đơn vị bán:
                      </span>
                      <span className="gpdetail-product-info-value">
                        {currentPost?.depositAmount} (
                        {currentPost?.depositPercentage}%)
                      </span>
                    </div>

                    <div className="gpdetail-product-info-row">
                      <span className="gpdetail-product-info-label">
                        Tiền đặt cọc:
                      </span>
                      <span className="gpdetail-product-info-value">
                        {currentPost?.productData?.weightUnit}
                      </span>
                    </div>

                    <div className="gpdetail-product-info-row">
                      <span className="gpdetail-product-info-label">
                        Ngày bắt đầu thu hoạch:
                      </span>
                      <span className="gpdetail-product-info-value">
                        {
                          new Date(currentPost?.harvestDate)
                            .toISOString()
                            .split("T")[0]
                        }
                        {/* {currentPost?.harvestDate} */}
                      </span>
                    </div>

                    <div className="gpdetail-product-info-row">
                      <span className="gpdetail-product-info-label">
                        Trạng thái mùa vụ:
                      </span>
                      <span className="gpdetail-product-info-value">
                        {currentPost?.harvestStatus}
                      </span>
                    </div>

                    <div className="gpdetail-product-info-row">
                      <span className="gpdetail-product-info-label">
                        Danh mục:
                      </span>
                      <span className="gpdetail-product-info-value">
                        {currentPost?.productData?.productCategory}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPost && currentPost?.postStatus === "ACTIVE" && (
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
        )}
      </div>

      <LoadingPopup isOpen={isLoading} />
    </div>
  );
}

export default GPostDetailModal;
