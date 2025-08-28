import React from "react";
import axios from "axios";
import { useState } from "react";
import "./GCreatePostModal.css";
import QuillTestbox from "../../../components/textarea/QuillTextbox";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingPopup from "../../../components/loading/LoadingPopup";
import { faL } from "@fortawesome/free-solid-svg-icons";

function GCreatePostModal({ isOpen, onClose, onCreate, productList }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    harvestDate: "",
    postEndDate: new Date(),
    postMediaDTOs: [],
    productId: "",
    gardenerId: localStorage.getItem("account_id"),
    harvestStatus: "",
    depositAmount: 0,
    depositPercentage: 0,
  });

  const [contentValue, setContentValue] = useState("");
  const [createVideo, setCreateVideo] = useState();
  const [createImages, setCreateImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDepositPercentageChange = (value) => {
    // Only allow numbers and reset negative values to 0
    let numericValue = Number.parseFloat(value) || 0;
    if (numericValue < 0) {
      numericValue = 0;
    }

    // Calculate deposit percentage based on selected product price
    let depositAmount = 0;
    if (formData.productId && productList) {
      const selectedProduct = productList.find(
        (p) => p.productId === formData.productId
      );
      if (selectedProduct && selectedProduct.price > 0) {
        depositAmount = Math.floor(
          (numericValue / 100) * selectedProduct.price
        );
      }
    }

    setFormData((prev) => ({
      ...prev,
      depositAmount: depositAmount,
      depositPercentage: numericValue,
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

  const handleHarvestStatusToggle = (status) => {
    setFormData((prev) => ({
      ...prev,
      harvestStatus: status,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedAt = new Date().toISOString();
    setIsLoading(true);
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

      const thumbnailUrl = `https://res.cloudinary.com/dhin0zlf7/video/upload/so_1/${publicId}.jpg`;
      mediaList.push({
        mediumUrl: thumbnailUrl,
        mediumType: "THUMBNAIL",
        uploadedAt,
      });

      //Upload images
      const imageUploadPromises = createImages.map(async (image) => {
        fileData.set("file", image);

        const imageRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dhin0zlf7/image/upload",
          fileData
        );

        return {
          mediumUrl: imageRes.data.secure_url,
          mediumType: "IMAGE",
          uploadedAt,
        };
      });

      // Wait for all uploads to finish
      const imageMedia = await Promise.all(imageUploadPromises);

      // Push them to mediaList
      mediaList.push(...imageMedia);

      const createData = formData;
      createData.content = contentValue;
      createData.postMediaDTOs = mediaList;
      createData.harvestDate = dayjs(formData.harvestDate, "D/M/YYYY").format(
        "YYYY-MM-DD"
      );
      createData.postEndDate = dayjs(formData.postEndDate, "D/M/YYYY").format(
        "YYYY-MM-DD"
      );

      onCreate(createData);
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
      setContentValue("");
      setCreateVideo();
      setCreateImages([]);
      setIsLoading(false);
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

  const handleClose = () => {
    setFormData({
      title: "",
      content: "",
      harvestDate: "",
      postEndDate: new Date(),
      postMediaDTOs: [],
      productId: "",
      gardenerId: localStorage.getItem("account_id"),
      harvestStatus: "",
      depositAmount: 0,
      depositPercentage: 0,
    });
    onClose();
  };

  const harvestStatusList = [
    { status: "PREORDEROPEN", display: "Mở đặt cọc" },
    { status: "PLANTING", display: "Đang trồng" },
    { status: "HARVESTING", display: "Thu hoạch" },
    { status: "PROCESSING", display: "Đóng gói" },
    { status: "READYFORSALE", display: "Có hàng" },
  ];

  return (
    <div className="gpcreate-overlay" onClick={handleClose}>
      <div className="gpcreate-popup" onClick={(e) => e.stopPropagation()}>
        <div className="gpcreate-header">
          <h2 className="gpcreate-title">Tạo bài viết mới</h2>
          <button className="gpcreate-close" onClick={handleClose}>
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
            <ReactQuill
              theme="snow"
              value={contentValue}
              onChange={setContentValue}
            />
          </div>

          {/* Havest Date */}
          <div className="gpcreate-field">
            <label className="gpcreate-label">Ngày bắt đầu thu hoạch *</label>
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
            <label className="gpcreate-label">Chọn sản phẩm *</label>

            <select
              onChange={(e) => handleProductToggle(e.target.value)}
              className="gpcreate-product-list"
            >
              <option value="">-- Chọn sản phẩm --</option>
              {Array.isArray(productList) &&
                productList.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName}
                  </option>
                ))}
            </select>
          </div>

          {/* Must choose a product to fill the next required field (Harvest status, Deposit amount)*/}
          {/* Harvest status */}
          <div className="gpcreate-field">
            <label className="gpcreate-label">Trạng thái mùa vụ: *</label>
            <select
              onChange={(e) => handleHarvestStatusToggle(e.target.value)}
              className="gpcreate-product-list"
              disabled={formData.productId === ""}
            >
              <option value="">-- Chọn trạng thái mùa vụ --</option>
              {harvestStatusList.map((hs) => (
                <option key={hs.status} value={hs.status}>
                  {hs.display}
                </option>
              ))}
            </select>
          </div>

          <div className="gpcreate-field">
            <label className="gpcreate-label">Phần trăm đặt cọc *</label>
            <input
              type="number"
              value={formData.depositPercentage}
              onChange={(e) => handleDepositPercentageChange(e.target.value)}
              className="gpcreate-input gpcreate-deposit-input"
              placeholder="Nhập số tiền cọc"
              min="0"
              max="100"
              disabled={formData.productId === ""}
            />
          </div>

          <div className="gpcreate-actions">
            <button
              type="button"
              className="gpcreate-btn gpcreate-btn-cancel"
              onClick={handleCancel}
            >
              Hủy
            </button>
            <button type="submit" className="cproduct-create-button">
              Tạo
            </button>
          </div>
        </form>
      </div>

      <LoadingPopup isOpen={isLoading} />
    </div>
  );
}

export default GCreatePostModal;
