import React from "react";
import { useState } from "react";
import "./GUpdateCertificate.css";

function GUpdateCertificate({ certificate, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: certificate.name,
    issuedBy: certificate.issuedBy,
    issueDate: certificate.issueDate,
    expiryDate: certificate.expiryDate,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...certificate, ...formData });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="gupdatecertificate-popup-overlay"
      onClick={handleOverlayClick}
    >
      <div className="gupdatecertificate-popup-container">
        <div className="gupdatecertificate-popup-header">
          <button className="gupdatecertificate-back-btn" onClick={onClose}>
            ←
          </button>
          <h2>Update Certificate</h2>
        </div>

        <form onSubmit={handleSubmit} className="gupdatecertificate-popup-form">
          <div className="gupdatecertificate-form-group">
            <label htmlFor="name">Certificate Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gupdatecertificate-form-group">
            <label htmlFor="issuedBy">Issued By</label>
            <input
              type="text"
              id="issuedBy"
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gupdatecertificate-form-group">
            <label htmlFor="issueDate">Issue Date</label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gupdatecertificate-form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gupdatecertificate-popup-actions">
            <button type="submit" className="gupdatecertificate-btn-primary">
              Update
            </button>
            <button
              type="button"
              className="gupdatecertificate-btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GUpdateCertificate;
