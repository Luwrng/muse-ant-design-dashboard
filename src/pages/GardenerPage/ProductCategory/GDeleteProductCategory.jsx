import React from "react";
import "./GDeleteProductCategory.css";

function GDeleteProductCategory({ category, onClose, onConfirm }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="gpcdelete-modal-overlay" onClick={handleOverlayClick}>
      <div className="gpcdelete-delete-modal-container">
        <div className="gpcdelete-delete-modal-header">
          <h2 className="gpcdelete-delete-modal-title">Xác nhận xóa</h2>
          <button className="gpcdelete-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="gpcdelete-delete-modal-content">
          <div className="gpcdelete-warning-icon">⚠️</div>
          <p className="gpcdelete-delete-message">
            Bạn có chắc xóa danh mục sản phẩm <strong>"{category.name}"</strong>{" "}
            không?
          </p>
        </div>

        <div className="gpcdelete-delete-modal-actions">
          <button
            type="button"
            className="gpcdelete-cancel-btn"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            type="button"
            className="gpcdelete-delete-btn"
            onClick={onConfirm}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default GDeleteProductCategory;
