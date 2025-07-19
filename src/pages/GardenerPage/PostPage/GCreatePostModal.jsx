import React from "react";
import { useState } from "react";
import "./GCreatePostModal.css";

function GCreatePostModal({ isOpen, onClose, onCreate, productList = [] }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    harvestDate: "",
    postEndDate: new Date(),
    postMediaDTOs: [],
    productId: "",
    gardenerId: localStorage.getItem("account_id"),
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      video: file,
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleProductToggle = (productId) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(productId)
        ? prev.selectedProducts.filter((id) => id !== productId)
        : [...prev.selectedProducts, productId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({
      title: "",
      content: "",
      video: null,
      images: [],
      selectedProducts: [],
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      content: "",
      harvestDate: "",
      postEndDate: new Date(),
      postMediaDTOs: [],
      productId: "",
      gardenerId: localStorage.getItem("account_id"),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="gpcreate-overlay" onClick={onClose}>
      <div className="gpcreate-popup" onClick={(e) => e.stopPropagation()}>
        <div className="gpcreate-header">
          <h2 className="gpcreate-title">Tạo bài viết mới</h2>
          <button className="gpcreate-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="gpcreate-form">
          <div className="gpcreate-field">
            <label className="gpcreate-label">Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="gpcreate-file-input"
            />
            {formData.video && (
              <div className="gpcreate-file-preview">
                <span>📹 {formData.video.name}</span>
              </div>
            )}
          </div>

          <div className="gpcreate-field">
            <label className="gpcreate-label">Hình ảnh</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="gpcreate-file-input"
            />
            {Array.isArray(formData.images) && formData.images.length > 0 && (
              <div className="gpcreate-images-preview-grid">
                {formData.images.map((image, index) => (
                  <div key={index} className="gpcreate-image-preview-item">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="gpcreate-preview-image"
                    />
                    <button
                      type="button"
                      className="gpcreate-remove-image"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                    <div className="gpcreate-image-info">
                      <span className="gpcreate-image-name">{image.name}</span>
                      <span className="gpcreate-image-size">
                        {(image.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="gpcreate-field">
            <label className="gpcreate-label">Tiêu đề *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="gpcreate-input"
              placeholder="Nhập tiêu đề bài viết"
              required
            />
          </div>

          <div className="gpcreate-field">
            <label className="gpcreate-label">Nội dung *</label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              className="gpcreate-textarea"
              placeholder="Nhập nội dung bài viết"
              rows={4}
              required
            />
          </div>

          <div className="gpcreate-field">
            <label className="gpcreate-label">Chọn sản phẩm</label>
            <div className="gpcreate-product-list">
              {Array.isArray(productList) &&
                productList.map((product) => (
                  <div key={product.id} className="gpcreate-product-item">
                    <input
                      type="checkbox"
                      id={`product-${product.id}`}
                      checked={formData.selectedProducts.includes(product.id)}
                      onChange={() => handleProductToggle(product.id)}
                      className="gpcreate-checkbox"
                    />
                    <label
                      htmlFor={`product-${product.id}`}
                      className="gpcreate-product-label"
                    >
                      <img
                        src={
                          product.image || "/placeholder.svg?height=40&width=40"
                        }
                        alt={product.name}
                        className="gpcreate-product-image"
                      />
                      <span className="gpcreate-product-name">
                        {product.name}
                      </span>
                    </label>
                  </div>
                ))}
            </div>
          </div>

          <div className="gpcreate-actions">
            <button
              type="button"
              className="gpcreate-btn gpcreate-btn-cancel"
              onClick={handleCancel}
            >
              Hủy
            </button>
            <button type="submit" className="gpcreate-btn gpcreate-btn-create">
              Tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GCreatePostModal;
