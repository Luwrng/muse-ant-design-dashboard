import React, { useEffect, useState } from "react";
import { StarIcon } from "lucide-react";
import "./ProductDetailPage.css";
import productService from "../../services/apiServices/productService";

function ProductDetailPage({
  product,
  isOpen,
  onClose,
  onUpdatePrice,
  onChangeStatus,
}) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!product || !product.productId) return;

    const fetchReviews = async () => {
      try {
        const result = await productService.getProductReview(product.productId);
        setReviews(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReviews();
  }, [product]);

  if (!isOpen || !product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // const mockReviews = [
  //   {
  //     id: "r1",
  //     reviewerName: "Nguyễn Văn A",
  //     reviewerAvatar: "/placeholder.svg?height=40&width=40",
  //     comment: "Sản phẩm rất tươi ngon, giao hàng nhanh chóng. Rất hài lòng!",
  //     rating: 5,
  //     createdAt: "2024-07-10",
  //   },
  //   {
  //     id: "r2",
  //     reviewerName: "Trần Thị B",
  //     reviewerAvatar: "/placeholder.svg?height=40&width=40",
  //     comment: "Chất lượng tốt, nhưng giá hơi cao so với thị trường.",
  //     rating: 4,
  //     createdAt: "2024-07-08",
  //   },
  //   {
  //     id: "r3",
  //     reviewerName: "Lê Văn C",
  //     reviewerAvatar: "/placeholder.svg?height=40&width=40",
  //     comment: "Sản phẩm bị dập nhẹ khi nhận hàng, cần cải thiện đóng gói.",
  //     rating: 3,
  //     createdAt: "2024-07-05",
  //   },
  //   {
  //     id: "r4",
  //     reviewerName: "Lê Văn C",
  //     reviewerAvatar: "/placeholder.svg?height=40&width=40",
  //     comment: "Sản phẩm bị dập nhẹ khi nhận hàng, cần cải thiện đóng gói.",
  //     rating: 3,
  //     createdAt: "2024-07-05",
  //   },
  //   {
  //     id: "r5",
  //     reviewerName: "Lê Văn C",
  //     reviewerAvatar: "/placeholder.svg?height=40&width=40",
  //     comment: "Sản phẩm bị dập nhẹ khi nhận hàng, cần cải thiện đóng gói.",
  //     rating: 3,
  //     createdAt: "2024-07-05",
  //   },
  // ];

  const BackIcon = () => (
    <svg
      className="gpd-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  const TagIcon = () => (
    <svg
      className="gpd-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  );

  return (
    <div className="gpd-modal-overlay" onClick={handleOverlayClick}>
      <div className="gpd-modal-content">
        <div className="gpd-modal-header">
          <button className="gpd-back-button" onClick={onClose}>
            <BackIcon />
            Quay lại
          </button>
          <div className="gpd-header-actions">
            <button
              className="gpd-edit-button"
              onClick={() => onUpdatePrice(product)}
            >
              Chỉnh sửa
            </button>
            <button
              className="gpd-hide-button"
              onClick={() => onChangeStatus(product, "hide")}
            >
              Ẩn sản phẩm
            </button>
          </div>
        </div>

        <div className="gpd-modal-body">
          <div className="gpd-product-info-section">
            <h1 className="gpd-product-title">{product.productName}</h1>

            <div className="gpd-product-id-section">
              <span className="gpd-product-id-title">Id: </span>
              <span className="gpd-product-id-value">{product.productId}</span>
            </div>
            <div className="gpd-product-status-section">
              <span className="gpd-status-badge">Status: </span>
              <span className="gpd-status-badge-value">{product.status}</span>
            </div>

            <div className="gpd-price-section">
              <div className="gpd-price">
                {new Intl.NumberFormat("vi-VN").format(product.price)}{" "}
                {product.currency}
              </div>
              <div className="gpd-price-unit">Đơn vị: {product.weightUnit}</div>
            </div>

            <div className="gpd-info-section">
              <div>
                <div className="gpd-info-label">Danh mục:</div>
                <div className="gpd-category-tag">
                  <TagIcon />
                  {product.productCategory}
                </div>
              </div>

              <div className="gpd-date-info">
                <div className="gpd-date-item">
                  <span className="gpd-date-label">Ngày tạo: </span>
                  <span className="gpd-date-value">
                    {new Date(product.createdAt).toISOString().split("T")[0]}
                  </span>
                  {/*Change to product value */}
                </div>
                <div className="gpd-date-item">
                  <span className="gpd-date-label">Ngày cập nhật:</span>
                  <span className="gpd-date-value">
                    {new Date(product.updatedAt).toISOString().split("T")[0]}
                  </span>
                  {/*Change to product value */}
                </div>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="gpd-reviews-section">
            <h2 className="gpd-reviews-title">Đánh giá từ người bán lẻ</h2>
            {reviews.length > 0 ? (
              <div className="gpd-reviews-list">
                {reviews.map((review) => (
                  <div key={review.reviewId} className="gpd-review-item">
                    <div className="gpd-reviewer-header">
                      <div className="gpd-reviewer-avatar-container">
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={`Avatar of ${review.name}`}
                          className="gpd-reviewer-avatar"
                        />
                      </div>
                      <div className="gpd-reviewer-name">{review.name}</div>
                    </div>
                    <p className="gpd-review-comment">{review.comment}</p>
                    <div className="gpd-review-rating">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`gpd-star-icon ${
                            i < review.rating
                              ? "gpd-star-filled"
                              : "gpd-star-empty"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="gpd-review-date">{review.createdAt}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="gpd-no-reviews">Chưa có đánh giá nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
