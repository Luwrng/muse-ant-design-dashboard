import React from "react";
import { useState } from "react";
import "./GPasswordChange.css";

function GPasswordChange({ onClose }) {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("Password change requested:", formData);
    onClose();
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
    <div className="gchangepass-popup-overlay" onClick={handleOverlayClick}>
      <div className="gchangepass-popup-container">
        <div className="gchangepass-popup-header">
          <button className="gchangepass-back-btn" onClick={onClose}>
            ←
          </button>
          <h2>Change Password</h2>
        </div>

        <form onSubmit={handleSubmit} className="gchangepass-popup-form">
          <div className="gchangepass-form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gchangepass-form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gchangepass-popup-actions">
            <button type="submit" className="gchangepass-btn-primary">
              Change
            </button>
            <button
              type="button"
              className="gchangepass-btn-secondary"
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

export default GPasswordChange;
