import React from "react";
import { useState } from "react";
import "./CreateProductPage.css";

function CreateProductPage({ onBack }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    weight: "",
    category: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating product:", formData);
    // Add your product creation logic here
    // After successful creation, you might want to go back to the management page
    onBack();
  };

  const SearchIcon = () => (
    <svg
      className="cproduct-icon cproduct-search-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
  );

  return (
    <div className="create-product-container">
      <div className="create-product-content">
        <h1 className="cproduct-page-title">Tạo sản phẩm</h1>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="cproduct-form-group">
            <label className="cproduct-form-label">
              Tên sản phẩm <span className="cproduct-required">*</span>
            </label>
            <div className="cproduct-input-container">
              <input
                type="text"
                className="cproduct-form-input"
                placeholder="Mô tả tên sản phẩm của bạn"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                maxLength={180}
                required
              />
              <span className="cproduct-character-count">
                {formData.name.length}/180
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="cproduct-form-group">
            <label className="cproduct-form-label">
              Giá tiền <span className="cproduct-required">*</span>
            </label>
            <div className="cproduct-search-input-container">
              <input
                type="text"
                className="cproduct-search-input"
                placeholder="Nhập giá bán"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="cproduct-form-group">
            <label className="cproduct-form-label">
              Phân loại <span className="cproduct-required">*</span>
            </label>
            <div className="cproduct-search-input-container">
              <input
                type="text"
                className="cproduct-search-input"
                placeholder="Chọn phân loại"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                required
              />
              <SearchIcon />
            </div>
          </div>

          {/* Form Actions */}
          <div className="cproduct-form-actions">
            <button
              type="button"
              className="cproduct-cancel-button"
              onClick={onBack}
            >
              Hủy
            </button>
            <button type="submit" className="cproduct-create-button">
              Tạo sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProductPage;
