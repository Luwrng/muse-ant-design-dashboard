import React from "react";
import "./GPopup.css";

function GPopup({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div
      className="gpopup-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="gpopup-content">
        <h2 className="gpopup-title">Thông báo</h2>
        <p className="gpopup-message">
          Bạn cần đăng nhập trước khi thực hiện hành động này!
        </p>
        <button className="gpopup-button" onClick={onConfirm}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default GPopup;
