import { useState } from "react";
import "./GCreateProductCategory.css";

function GCreateProductCategory({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
      onSubmit(formData);
      setFormData({ name: "", description: "" });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="gcpcate-modal-overlay" onClick={handleOverlayClick}>
      <div className="gcpcate-modal-container">
        <div className="gcpcate-modal-header">
          <h2 className="gcpcate-modal-title">Tạo danh mục mới</h2>
          <button className="gcpcate-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="gcpcate-modal-form" onSubmit={handleSubmit}>
          <div className="gcpcate-form-group">
            <label className="gcpcate-form-label">
              Tên danh mục <span className="gcpcate-required">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="gcpcate-form-input"
              placeholder="Nhập tên danh mục"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="gcpcate-form-group">
            <label className="gcpcate-form-label">Mô tả</label>
            <textarea
              name="description"
              className="gcpcate-form-textarea"
              placeholder="Nhập mô tả danh mục"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="gcpcate-modal-actions">
            <button
              type="button"
              className="gcpcate-cancel-btn"
              onClick={onClose}
            >
              Hủy
            </button>
            <button type="submit" className="gcpcate-submit-btn">
              Tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GCreateProductCategory;
