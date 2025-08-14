import React from "react";
import "./ErrorModal.css";

function ErrorModal({ message, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="gpcate-modal-overlay" onClick={handleOverlayClick}>
      <div className="gpcate-error-modal-container">
        <div className="gpcate-error-modal-header">
          <h2 className="gpcate-error-modal-title">Lỗi</h2>
          <button className="gpcate-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="gpcate-error-modal-content">
          <div className="gpcate-error-icon">❌</div>
          <p className="gpcate-error-message">{message}</p>
        </div>

        <div className="gpcate-error-modal-actions">
          <button
            type="button"
            className="gpcate-error-ok-btn"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
