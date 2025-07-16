import React from "react";
import { useState } from "react";
import "./GUpdateCertificate.css";
import certificateService from "../../../services/apiServices/certificateService";

function GUpdateCertificate({ certificate, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: certificate.name,
    issuingAuthority: certificate.issuingAuthority,
    issueDate: new Date(certificate.issueDate).toISOString().split("T")[0],
    expiryDate: new Date(certificate.expiryDate).toISOString().split("T")[0],
    status: certificate.status,
  });

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

  const handleUpdateSubmit = async (e) => {
    try {
      e.preventDefault();
      await certificateService.updateCertificate(
        certificate.certificateId,
        formData
      );
      onUpdate({ ...certificate, ...formData });
    } catch (err) {
      console.log(err);
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
          <h2>Cập nhật chứng chỉ</h2>
        </div>

        <form onSubmit={handleUpdateSubmit} className="gupdatecertificate-popup-form">
          <div className="gupdatecertificate-form-group">
            <label htmlFor="name">Tên chứng chỉ</label>
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
            <label htmlFor="issuingAuthority">Cấp bởi</label>
            <input
              type="text"
              id="issuingAuthority"
              name="issuingAuthority"
              value={formData.issuingAuthority}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gupdatecertificate-form-group">
            <label htmlFor="issueDate">Ngày cấp</label>
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
            <label htmlFor="expiryDate">Ngày hết hạn</label>
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
              onClick={handleUpdateSubmit}
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
