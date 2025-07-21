import React from "react";
import axios from "axios";
import { useState } from "react";
import "./GCreatePostModal.css";
import ReactQuill from "react-quill";

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

  const [createVideo, setCreateVideo] = useState();
  const [createImages, setCreateImages] = useState([]);

  if (!isOpen) return null;

  //       "mediumUrl": "string",
  //       "mediumType": "string",
  //       "uploadedAt": "2025-07-20T19:16:47.406Z"

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setCreateVideo(file);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setCreateImages((prev) => [...prev, ...files]);
  };

  const removeImage = (indexToRemove) => {
    setCreateImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleProductToggle = (productId) => {
    setFormData((prev) => ({
      ...prev,
      productId: productId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedAt = new Date().toISOString();
    try {
      const mediaList = [];

      //Upload Video => Get video url and thumbnail url
      const fileData = new FormData();
      fileData.append("file", createVideo);
      fileData.append("upload_preset", "clean_food_viet");

      const videoRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dhin0zlf7/video/upload",
        fileData
      );

      const publicId = videoRes.data.public_id;
      const secureUrl = videoRes.data.secure_url;

      //Push video + thumbnail
      mediaList.push({
        mediumUrl: secureUrl,
        mediumType: "VIDEO",
        uploadedAt,
      });

      const thumbnailUrl = `https://res.cloudinary.com/your_cloud_name/video/upload/so_1/${publicId}.jpg`;
      mediaList.push({
        mediumUrl: thumbnailUrl,
        mediumType: "THUMBNAIL",
        uploadedAt,
      });

      //Upload images
      createImages.map(async (image) => {
        fileData.set("file", image);

        const imageRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dhin0zlf7/image/upload",
          fileData
        );

        mediaList.push({
          mediumUrl: imageRes.data.secure_url,
          mediumType: "IMAGE",
          uploadedAt,
        });
      });

      setFormData((prev) => ({ ...prev, postMediaDTOs: mediaList }));

      onCreate(formData);
    } catch (err) {
      console.log(err);
    } finally {
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
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      content: "",
      harvestDate: new Date(),
      postEndDate: new Date(),
      postMediaDTOs: [],
      productId: "",
      gardenerId: localStorage.getItem("account_id"),
    });
    onClose();
  };

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
          {/* Video */}
          <div className="gpcreate-field">
            <label className="gpcreate-label">Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="gpcreate-file-input"
            />
            {createVideo && (
              <div className="gpcreate-file-preview">
                <span>📹 {createVideo.name}</span>
              </div>
            )}
          </div>

          {/* Image List */}
          <div className="gpcreate-field">
            <label className="gpcreate-label">Hình ảnh</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="gpcreate-file-input"
            />
            {Array.isArray(createImages) && createImages.length > 0 && (
              <div className="gpcreate-images-preview-grid">
                {createImages.map((image, index) => (
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

          {/* Title */}
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

          {/* Content */}
          <div className="gpcreate-field">
            <label className="gpcreate-label">Nội dung *</label>
            {/* <textarea
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              className="gpcreate-textarea"
              placeholder="Nhập nội dung bài viết"
              rows={4}
              required
            /> */}
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
            />
          </div>

          {/* Havest Date */}
          <div className="gpcreate-field">
            <label className="gpcreate-label">Ngày thu hoạch *</label>
            <input
              type="date"
              id="harvestDate"
              value={formData.harvestDate}
              onChange={(e) => handleInputChange("harvestDate", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="gpcreate-input"
              required
            />
          </div>

          {/* Post End Date */}
          <div className="gpcreate-field">
            <label className="gpcreate-label">
              Ngày dự tính kết thúc bài đăng *
            </label>
            <input
              type="date"
              id="postEndDate"
              value={formData.postEndDate}
              onChange={(e) => handleInputChange("postEndDate", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="gpcreate-input"
              required
            />
          </div>

          {/* Product */}
          <div className="gpcreate-field">
            <label className="gpcreate-label">Chọn sản phẩm</label>
            <div className="gpcreate-product-list">
              {Array.isArray(productList) &&
                productList.map((product) => (
                  <div key={product.id} className="gpcreate-product-item">
                    <input
                      type="checkbox"
                      id={`product-${product.productId}`}
                      checked={formData.selectedProducts.includes(
                        product.productId
                      )}
                      onChange={() => handleProductToggle(product.productId)}
                      className="gpcreate-checkbox"
                    />
                    <label
                      htmlFor={`product-${product.productId}`}
                      className="gpcreate-product-label"
                    >
                      {/* <img
                        src={
                          product.image || "/placeholder.svg?height=40&width=40"
                        }
                        alt={product.productName}
                        className="gpcreate-product-image"
                      /> */}
                      <span className="gpcreate-product-name">
                        {product.productName}
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
