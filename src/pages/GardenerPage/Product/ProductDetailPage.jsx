import React, { useEffect, useState } from "react";
import { StarIcon } from "lucide-react";
import "./ProductDetailPage.css";
import productService from "../../services/apiServices/productService";

function ProductDetailPage({
  product,
  setProduct,
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

  // In UI created Icons
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

  const CertificateIcon = () => (
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
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  const CloseIcon = () => (
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
        d="M6 18L18 6M6 6l12 12"
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
              className={`gpd-${
                product.status === "ACTIVE" ? "hide" : "show"
              }-button`}
              onClick={() => {
                const newStatus =
                  product.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
                onChangeStatus(
                  product,
                  newStatus === "INACTIVE" ? "hide" : "show"
                );
                setProduct({
                  ...product,
                  status: product,
                });
              }}
            >
              {product.status === "ACTIVE" ? "Ẩn" : "Hiện"} sản phẩm
            </button>
            {/* <button className="gpd-close-button" onClick={onClose}>
              <CloseIcon />
            </button> */}
          </div>
        </div>

        <div className="gpd-modal-body">
          <div className="gpd-product-info-section">
            <h1 className="gpd-product-title">{product.productName}</h1>

            <div className="gpd-product-id-section">
              <span className="gpd-product-id-title">Id: </span>
              <span className="gpd-product-id-value">{product.productId}</span>
              <span className="gpd-status-badge">Status: </span>
              <span
                className={`gpd-status-badge-value ${product.status.toLowerCase()}`}
              >
                {product.status}
              </span>
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

              {/* Product Tags Section */}
              {product.productTags && product.productTags.length > 0 && (
                <div className="gpd-tags-section">
                  <div className="gpd-tags-title">Các nhãn:</div>
                  <div className="gpd-tags-list">
                    {product.productTags.map((tag, index) => (
                      <span key={index} className="gpd-tag-item">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

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

          {/* Product Certificates Section */}
          {product.certificates && product.certificates.length > 0 && (
            <div className="gpd-certificates-section">
              <h2 className="gpd-certificates-title">
                <CertificateIcon />
                Các chứng chỉ
              </h2>
              <div className="gpd-certificates-list">
                {product.certificates.map((cert) => (
                  <div
                    key={cert.productCertificateId}
                    className="gpd-certificate-item"
                  >
                    <div className="gpd-certificate-header">
                      <div className="gpd-certificate-icon-container">
                        <img
                          src={
                            cert.imageUrl ||
                            "/placeholder.svg?height=40&width=40&query=certificate icon"
                          }
                          alt={`Icon for ${cert.title}`}
                          width={40}
                          height={80}
                          className="gpd-certificate-icon"
                        />
                      </div>
                      <div className="gpd-certificate-details">
                        <div className="gpd-certificate-title">
                          {cert.certificateName}
                        </div>
                        <div className="gpd-certificate-description">
                          {cert.issuingOrganization}
                        </div>
                        <div className="gpd-certificate-id">
                          #{cert.certificateNumber}
                        </div>
                        <div className="gpd-certificate-dates">
                          <div className="gpd-certificate-date-item">
                            <span className="gpd-certificate-date-label">
                              Ngày cấp:{" "}
                            </span>
                            <span className="gpd-certificate-date-value">
                              {
                                new Date(cert.issuedDate)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </span>
                          </div>
                          <div className="gpd-certificate-date-item">
                            <span className="gpd-certificate-date-label">
                              Ngày hết hạn:{" "}
                            </span>
                            <span className="gpd-certificate-date-value">
                              {
                                new Date(cert.expirationDate)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      {cert.isExpired && (
                        <span className="gpd-expired-badge">Hết hạn</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
