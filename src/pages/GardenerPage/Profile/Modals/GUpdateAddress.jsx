import React from "react";
import addressService from "../../../services/apiServices/addressService";
import { useState } from "react";
import "./GUpdateAddress.css";

function GUpdateAddress({ address, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    addressLine: address.addressLine,
    city: address.city,
    province: address.province,
    country: address.country,
    postalCode: address.postalCode,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...address, ...formData });
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

  const onUpdateSubmit = async () => {
    try {
      await addressService.updateAddress(address.addressId, formData);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="gupdateaddress-popup-overlay" onClick={handleOverlayClick}>
      <div className="gupdateaddress-popup-container">
        <div className="gupdateaddress-popup-header">
          <button className="gupdateaddress-back-btn" onClick={onClose}>
            ←
          </button>
          <h2>Update Address</h2>
        </div>

        <form onSubmit={handleSubmit} className="gupdateaddress-popup-form">
          <div className="gupdateaddress-form-group">
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

          <div className="gupdateaddress-form-group">
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

          <div className="gupdateaddress-form-group">
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

          <div className="gupdateaddress-form-group">
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

          <div className="gupdateaddress-form-group">
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

          <div className="gupdateaddress-popup-actions">
            <button type="submit" className="gupdateaddress-btn-primary">
              Update
            </button>
            <button
              type="button"
              className="gupdateaddress-btn-secondary"
              onClick={onUpdateSubmit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GUpdateAddress;
