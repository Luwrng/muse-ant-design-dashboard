import React from "react";
import "./LoadingOverlay.css";

function LoadingOverlay() {
  return (
    <div className="gpcate-loading-overlay">
      <div className="gpcate-loading-container">
        <div className="gpcate-loading-spinner"></div>
        <p className="gpcate-loading-text">Đang xử lý...</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
