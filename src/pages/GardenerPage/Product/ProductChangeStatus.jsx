import React from "react";
import "./ProductChangeStatus.css";

function ProductChangeStatus({ product, isOpen, onClose, onConfirm, action }) {
  if (!isOpen || !product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getActionText = () => {
    switch (action) {
      case "hide":
        return `ẩn sản phẩm "${product.productName}"`;
      case "show":
        return `hiển thị sản phẩm "${product.productName}"`;
      case "delete":
        return `xóa sản phẩm "${product.productName}"`;
      default:
        return `thay đổi trạng thái sản phẩm "${product.productName}"`;
    }
  };

  const getConfirmButtonText = () => {
    switch (action) {
      case "hide":
        return "Ẩn";
      case "show":
        return "Hiển thị";
      case "delete":
        return "Xóa";
      default:
        return "Xác nhận";
    }
  };

  const CloseIcon = () => (
    <svg
      className="gpconfirm-small-icon"
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

  const WarningIcon = () => (
    <svg className="gpconfirm-icon" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="gpconfirm-overlay" onClick={handleOverlayClick}>
      <div className="gpconfirm-modal">
        <button className="gpconfirm-close" onClick={onClose}>
          <CloseIcon />
        </button>

        <h2 className="gpconfirm-title">
          {action === "hide"
            ? "Xác nhận ẩn"
            : action === "delete"
            ? "Xác nhận xóa"
            : "Xác nhận thay đổi"}
        </h2>

        <WarningIcon />

        <p className="gpconfirm-message">
          Bạn có chắc {getActionText()} không?
        </p>

        <div className="gpconfirm-actions">
          <button className="gpconfirm-cancel" onClick={onClose}>
            Hủy
          </button>
          <button className="gpconfirm-confirm" onClick={onConfirm}>
            {getConfirmButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductChangeStatus;
