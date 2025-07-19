import React from "react";
import "./LoadingPage.css";

function LoadingPage({ isOpen, message = "Đang xử lý..." }) {
  if (!isOpen) return null;

  return (
    <div className="gploading-overlay">
      <div className="gploading-modal">
        <div className="gploading-spinner"></div>
        <p className="gploading-text">{message}</p>
      </div>
    </div>
  );
}

export default LoadingPage;
