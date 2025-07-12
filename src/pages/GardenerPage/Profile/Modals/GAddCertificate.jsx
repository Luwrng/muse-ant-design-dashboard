import React from "react";
import { useState } from "react";
import "./GAddCertificate.css";

function GAddCertificate({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    issuedBy: "",
    issueDate: "",
    expiryDate: "",
    status: "Active",
    imageUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
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
    <div className="gaddcertificate-popup-overlay" onClick={handleOverlayClick}>
      <div className="gaddcertificate-popup-container">
        <div className="gaddcertificate-popup-header">
          <button className="gaddcertificate-back-btn" onClick={onClose}>
            ←
          </button>
          <h2>Add Certificate</h2>
        </div>

        <form onSubmit={handleSubmit} className="gaddcertificate-popup-form">
          <div className="gaddcertificate-form-group">
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

          <div className="gaddcertificate-form-group">
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

          <div className="gaddcertificate-form-group">
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

          <div className="gaddcertificate-form-group">
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

          <div className="gaddcertificate-form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="gaddcertificate-form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/certificate.jpg"
            />
          </div>

          <div className="gaddcertificate-popup-actions">
            <button type="submit" className="gaddcertificate-btn-primary">
              Add
            </button>
            <button
              type="button"
              className="gaddcertificate-btn-secondary"
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

export default GAddCertificate;
