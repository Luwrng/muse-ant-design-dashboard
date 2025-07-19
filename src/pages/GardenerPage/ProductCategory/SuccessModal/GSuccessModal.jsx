import React from "react";
import "./SuccessModal.css";

function GSuccessModal({ message, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="gpcsucces-modal-overlay" onClick={handleOverlayClick}>
      <div className="gpcsucces-modal-container">
        <div className="gpcsucces-modal-header">
          <h2 className="gpcsucces-modal-title">Thành công</h2>
          <button className="gpcsucces-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="gpcsucces-modal-content">
          <div className="gpcsucces-success-icon">✅</div>
          <p className="gpcsucces-success-message">{message}</p>
        </div>

        <div className="gpcsucces-modal-actions">
          <button type="button" className="gpcsucces-ok-btn" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default GSuccessModal;
