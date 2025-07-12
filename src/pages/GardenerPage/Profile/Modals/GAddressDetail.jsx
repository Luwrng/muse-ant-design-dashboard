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
          <h2>Address Detail</h2>
        </div>

        <div className="gaddressdetail-popup-content">
          <div className="gaddressdetail-detail-group">
            <label>Address Line</label>
            <span>{address.addressLine}</span>
          </div>

          <div className="gaddressdetail-detail-group">
            <label>City</label>
            <span>{address.city}</span>
          </div>

          <div className="gaddressdetail-detail-group">
            <label>Province</label>
            <span>{address.province}</span>
          </div>

          <div className="gaddressdetail-detail-group">
            <label>Country</label>
            <span>{address.country}</span>
          </div>

          <div className="gaddressdetail-detail-group">
            <label>Postal Code</label>
            <span>{address.postalCode}</span>
          </div>

          <div className="gaddressdetail-popup-actions">
            <button className="gaddressdetail-btn-primary" onClick={onUpdate}>
              Update Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GAddressDetail;
