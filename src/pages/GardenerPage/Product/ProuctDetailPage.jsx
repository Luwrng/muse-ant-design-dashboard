import React from "react";
import "./ProductDetailPage.css";

function ProuctDetailPage({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const BackIcon = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  const TagIcon = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  );

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <button className="back-button" onClick={onClose}>
            <BackIcon />
            Quay lại
          </button>
          <div className="header-actions">
            <button className="edit-button">Chỉnh sửa</button>
            <button className="hide-button">Ẩn sản phẩm</button>
          </div>
        </div>

        <div className="modal-body">
          <div className="product-image-section">
            <div className="product-image">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
              />
            </div>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">Cà chua cherry đỏ</h1>

            <div className="product-id-section">
              <span className="product-id">Id: P01234355</span>
              <span className="status-badge">{product.status}</span>
            </div>

            <div className="price-section">
              <div className="price">35.000 đ</div>
              <div className="price-unit">Đơn vị tính: Kilogram</div>
            </div>

            <div className="info-section">
              <div>
                <div className="info-label">Danh mục:</div>
                <div className="category-tag">
                  <TagIcon />
                  Rau củ quả tươi
                </div>
              </div>

              <div className="date-info">
                <div className="date-item">
                  <span className="date-label">Ngày tạo:</span>
                  <span className="date-value">01/01/2025</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Ngày cập nhật:</span>
                  <span className="date-value">01/01/2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProuctDetailPage;
