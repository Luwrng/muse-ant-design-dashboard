import React from "react";
import { useState } from "react";
import "./GCreateAddress.css";

function GCreateAddress({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    addressLine: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
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
    <div className="gcreateaddress-popup-overlay" onClick={handleOverlayClick}>
      <div className="gcreateaddress-popup-container">
        <div className="gcreateaddress-popup-header">
          <button className="gcreateaddress-back-btn" onClick={onClose}>
            ←
          </button>
          <h2>Create Address</h2>
        </div>

        <form onSubmit={handleSubmit} className="gcreateaddress-popup-form">
          <div className="gcreateaddress-form-group">
            <label htmlFor="addressLine">Address Line</label>
            <input
              type="text"
              id="addressLine"
              name="addressLine"
              value={formData.addressLine}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gcreateaddress-form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gcreateaddress-form-group">
            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gcreateaddress-form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gcreateaddress-form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gcreateaddress-popup-actions">
            <button type="submit" className="gcreateaddress-btn-primary">
              Add
            </button>
            <button
              type="button"
              className="gcreateaddress-btn-secondary"
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

export default GCreateAddress;
