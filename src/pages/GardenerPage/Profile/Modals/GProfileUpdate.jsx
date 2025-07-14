import { useState } from "react";
import React from "react";
import "./GProfileUpdate.css";
import accountService from "../../../services/apiServices/accountService";

function GProfileUpdate({ profile, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: profile.name,
    gender: profile.gender,
    avatar: profile.avatar,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...profile, ...formData });
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

  const handleUpdateSubmit = async () => {
    try {
      const accountId = localStorage.getItem("account_id");
      await accountService.updateProfile(accountId, formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="gupdateprofile-popup-overlay" onClick={handleOverlayClick}>
      <div className="gupdateprofile-popup-container">
        <div className="gupdateprofile-popup-header">
          <button className="gupdateprofile-back-btn" onClick={onClose}>
            ←
          </button>
          <h2>Update Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="gupdateprofile-popup-form">
          <div className="gupdateprofile-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gupdateprofile-form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="gupdateprofile-form-group">
            <label htmlFor="avatar">Avatar Image URL</label>
            <input
              type="url"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="gupdateprofile-popup-actions">
            <button type="submit" className="gupdateprofile-btn-primary">
              Update
            </button>
            <button
              type="button"
              className="gupdateprofile-btn-secondary"
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

export default GProfileUpdate;
