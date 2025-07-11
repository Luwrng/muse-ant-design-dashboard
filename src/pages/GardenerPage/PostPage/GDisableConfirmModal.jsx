import React from "react";
import "./GDisableConfirmModal.css";

function GDisableConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="gpdconfirm-overlay" onClick={onClose}>
      <div className="gpdconfirm-popup" onClick={(e) => e.stopPropagation()}>
        <div className="gpdconfirm-content">
          <div className="gpdconfirm-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3 className="gpdconfirm-title">Xác nhận ẩn bài viết</h3>
          <p className="gpdconfirm-message">
            Bạn có muốn ẩn bài viết này không?
          </p>

          <div className="gpdconfirm-actions">
            <button
              className="gpdconfirm-btn gpdconfirm-btn-cancel"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              className="gpdconfirm-btn gpdconfirm-btn-confirm"
              onClick={onConfirm}
            >
              Ẩn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GDisableConfirmModal;
