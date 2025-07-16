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
      const accountId = localStorage.getItem("account_id");
      await accountService.updateProfile(accountId, formData);
      onUpdate({ ...profile, ...formData });
      onClose();
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
          <h2>Cập nhật hồ sơ</h2>
        </div>

        <form onSubmit={handleUpdateSubmit} className="gupdateprofile-popup-form">
          <div className="gupdateprofile-form-group">
            <label htmlFor="name">Tên</label>
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
            <label htmlFor="gender">Giới tính</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="gupdateprofile-form-group">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="text"
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
