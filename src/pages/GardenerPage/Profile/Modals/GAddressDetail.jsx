import React from "react";
import "./GAddressDetail.css";

function GAddressDetail({ address, onClose, onUpdate }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="gaddressdetail-popup-overlay" onClick={handleOverlayClick}>
      <div className="gaddressdetail-popup-container">
        <div className="gaddressdetail-popup-header">
          <button className="gaddressdetail-back-btn" onClick={onClose}>
            ←
          </button>
          <h2>Thông tin địa chỉ</h2>
        </div>

        <div className="gaddressdetail-popup-content">
          <div className="gaddressdetail-detail-group">
            <label>Địa chỉ</label>
            <span>{address.addressLine}</span>
          </div>

          <div className="gaddressdetail-detail-group">
            <label>Thành phố</label>
            <span>{address.city}</span>
          </div>

          <div className="gaddressdetail-detail-group">
            <label>Tỉnh</label>
            <span>{address.province}</span>
          </div>

          <div className="gaddressdetail-detail-group">
            <label>Quốc gia</label>
            <span>{address.country}</span>
          </div>

          <div className="gaddressdetail-detail-group">
            <label>Mã bưu chính</label>
            <span>{address.postalCode}</span>
          </div>

          <div className="gaddressdetail-popup-actions">
            <button className="gaddressdetail-btn-primary" onClick={onUpdate}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GAddressDetail;
