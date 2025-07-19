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

  const onUpdateSubmit = async (e) => {
    try {
      await addressService.updateAddress(address.addressId, formData);
      e.preventDefault();
      onUpdate({ ...address, ...formData });
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
          <h2>Cập nhật địa chỉ Address</h2>
        </div>

        <form onSubmit={onUpdateSubmit} className="gupdateaddress-popup-form">
          <div className="gupdateaddress-form-group">
            <label htmlFor="addressLine">Địa chỉ</label>
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
            <label htmlFor="city">Thành phố</label>
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
            <label htmlFor="province">Tỉnh</label>
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
            <label htmlFor="country">Quốc gia</label>
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
            <label htmlFor="postalCode">Mã bưu chính</label>
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
              Cập nhật
            </button>
            <button
              type="button"
              className="gupdateaddress-btn-secondary"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GUpdateAddress;
