import React from "react";
import { useState } from "react";
import "./GEditProductCategory.css";

function GEditProductCategory({ category, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit({ ...formData, id: category.id });
      setFormData({ name: "", description: "" });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="gcpedit-modal-overlay" onClick={handleOverlayClick}>
      <div className="gcpedit-modal-container">
        <div className="gcpedit-modal-header">
          <h2 className="gcpedit-modal-title">Sửa danh mục</h2>
          <button className="gcpedit-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="gcpedit-modal-form" onSubmit={handleSubmit}>
          <div className="gcpedit-form-group">
            <label className="gcpedit-form-label">
              Tên danh mục <span className="gcpedit-required">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="gcpedit-form-input"
              placeholder="Nhập tên danh mục"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="gcpedit-form-group">
            <label className="gcpedit-form-label">Mô tả</label>
            <textarea
              name="description"
              className="gcpedit-form-textarea"
              placeholder="Nhập mô tả danh mục"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="gcpedit-modal-actions">
            <button
              type="button"
              className="gcpedit-cancel-btn"
              onClick={onClose}
            >
              Hủy
            </button>
            <button type="submit" className="gcpedit-submit-btn">
              Sửa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GEditProductCategory;
