import React from "react";
import { useState } from "react";
import "./GCreateAddress.css";
import addressService from "../../../services/apiServices/addressService";
import LoadingPopup from "../../../../components/loading/LoadingPopup";

function GCreateAddress({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    addressLine: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const onCreateSubmit = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const accountId = localStorage.getItem("account_id");
      await addressService.createAddress(accountId, formData);
      setIsLoading(false);
      onAdd(formData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gcreateaddress-popup-overlay" onClick={handleOverlayClick}>
      <div className="gcreateaddress-popup-container">
        <div className="gcreateaddress-popup-header">
          <button className="gcreateaddress-back-btn" onClick={onClose}>
            ←
          </button>
          <h2>Tạo địa chỉ mới</h2>
        </div>

        <form onSubmit={onCreateSubmit} className="gcreateaddress-popup-form">
          <div className="gcreateaddress-form-group">
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

          <div className="gcreateaddress-form-group">
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

          <div className="gcreateaddress-form-group">
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

          <div className="gcreateaddress-form-group">
            <label htmlFor="country">Quốc Gia</label>
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

          <div className="gcreateaddress-popup-actions">
            <button type="submit" className="gcreateaddress-btn-primary">
              Tạo
            </button>
            <button
              type="button"
              className="gcreateaddress-btn-secondary"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>

      <LoadingPopup isOpen={isLoading} />
    </div>
  );
}

export default GCreateAddress;
