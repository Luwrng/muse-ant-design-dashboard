import React from "react";
import "./CreateProductCertificatePopup.css";
import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

function CreateProductCertificatePopup({ onClose, onAddCertificate }) {
  const [certificateFormData, setCertificateFormData] = useState({
    certificateName: "",
    issuingOrganization: "",
    certificateNumber: "",
    issuedDate: "",
    expirationDate: "",
    certificateImageUrl: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (field, value) => {
    setCertificateFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputImage = (e) => {
    const chosenFile = e.target.files[0];
    if (!chosenFile) return;

    setFile(chosenFile);
    setImagePreview(URL.createObjectURL(chosenFile));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !certificateFormData.certificateName ||
      !certificateFormData.issuingOrganization ||
      !certificateFormData.certificateNumber ||
      !certificateFormData.issuedDate ||
      !certificateFormData.expirationDate ||
      !file
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setShowConfirmModal(true); // Show confirmation modal
  };

  const handleConfirmAdd = async () => {
    const fileData = new FormData();
    fileData.append("file", file); // This will work
    fileData.append("upload_preset", "clean_food_viet");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dhin0zlf7/image/upload",
      fileData
    );

    const certificateData = certificateFormData;
    certificateData.certificateImageUrl = res.data.url;

    onAddCertificate(certificateData);
    setShowConfirmModal(false);
    onClose(); // Close the main certificate modal
  };

  return (
    <div className="gpcertiadd-modal-overlay" onClick={onClose}>
      <div
        className="gpcertiadd-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gpcertiadd-modal-header">
          <h2>Thêm chứng chỉ</h2>
          <button className="gpcertiadd-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="gpcertiadd-modal-body">
            <div className="gpcertiadd-form-group">
              <label
                htmlFor="certificateName"
                className="gpcertiadd-form-label"
              >
                Tên chứng chỉ <span className="gpcertiadd-required">*</span>
              </label>
              <input
                id="certificateName"
                type="text"
                className="gpcertiadd-form-input"
                placeholder="Nhập tên chứng chỉ"
                value={certificateFormData.certificateName}
                onChange={(e) =>
                  handleInputChange("certificateName", e.target.value)
                }
                required
              />
            </div>
            <div className="gpcertiadd-form-group">
              <label
                htmlFor="issuingOrganization"
                className="gpcertiadd-form-label"
              >
                Nơi cấp <span className="gpcertiadd-required">*</span>
              </label>
              <input
                id="issuingOrganization"
                type="text"
                className="gpcertiadd-form-input"
                placeholder="Nhập nơi cấp"
                value={certificateFormData.issuingOrganization}
                onChange={(e) =>
                  handleInputChange("issuingOrganization", e.target.value)
                }
                required
              />
            </div>
            <div className="gpcertiadd-form-group">
              <label
                htmlFor="certificateNumber"
                className="gpcertiadd-form-label"
              >
                Số chứng nhận <span className="gpcertiadd-required">*</span>
              </label>
              <input
                id="certificateNumber"
                type="text"
                className="gpcertiadd-form-input"
                placeholder="Nhập số chứng chỉ"
                value={certificateFormData.certificateNumber}
                onChange={(e) =>
                  handleInputChange("certificateNumber", e.target.value)
                }
                required
              />
            </div>
            <div className="gpcertiadd-form-group gpcertiadd-form-group-inline">
              <div className="gpcertiadd-form-group-half">
                <label htmlFor="issuedDate" className="gpcertiadd-form-label">
                  Ngày cấp <span className="gpcertiadd-required">*</span>
                </label>
                <input
                  id="issuedDate"
                  type="date"
                  className="gpcertiadd-form-input"
                  value={certificateFormData.issuedDate}
                  onChange={(e) =>
                    handleInputChange("issuedDate", e.target.value)
                  }
                  required
                />
              </div>
              <div className="gpcertiadd-form-group-half">
                <label
                  htmlFor="expirationDate"
                  className="gpcertiadd-form-label"
                >
                  Ngày hết hạn <span className="gpcertiadd-required">*</span>
                </label>
                <input
                  id="expirationDate"
                  type="date"
                  className="gpcertiadd-form-input"
                  value={certificateFormData.expirationDate}
                  onChange={(e) =>
                    handleInputChange("expirationDate", e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div className="gpcertiadd-form-group">
              <label
                htmlFor="certificateImageUrl"
                className="gpcertiadd-form-label"
              >
                Ảnh chứng chỉ <span className="gpcertiadd-required">*</span>
              </label>
              <input
                id="certificateImageUrl"
                type="file"
                className="gpcertiadd-form-input"
                placeholder="Enter image URL"
                accept="image/*"
                onChange={(e) => handleInputImage(e)}
                required
              />

              {/* Show a temp image URL */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: 200, height: "auto" }}
                />
              )}
            </div>
          </div>
          <div className="gpcertiadd-modal-footer">
            <button
              type="button"
              className="gpcertiadd-cancel-button"
              onClick={onClose}
            >
              Hủy
            </button>
            <button type="submit" className="gpcertiadd-add-button">
              Tạo chứng chỉ
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="gpcertiadd-confirm-overlay"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="gpcertiadd-confirm-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gpcertiadd-confirm-header">
              <h2>Thông báo xác nhận</h2>
              <button
                className="gpcertiadd-modal-close"
                onClick={() => setShowConfirmModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="gpcertiadd-confirm-body">
              <p>Bạn có muốn thêm chứng chỉ với những thông tin đã cung cấp?</p>
              <p className="gpcertiadd-confirm-warning">
                Một khi chững chỉ được thêm vào hệ thống, bạn sẽ không thể thay
                đổi thông tin của chứng chỉ.
              </p>
              <div className="gpcertiadd-confirm-details">
                <p>
                  <strong>Tên:</strong> {certificateFormData.certificateName}
                </p>
                <p>
                  <strong>Nơi cấp:</strong>{" "}
                  {certificateFormData.issuingOrganization}
                </p>
                <p>
                  <strong>Số chững chỉ:</strong>{" "}
                  {certificateFormData.certificateNumber}
                </p>
                <p>
                  <strong>Ngày cấp:</strong> {certificateFormData.issuedDate}
                </p>
                <p>
                  <strong>Ngày hết hạn:</strong>{" "}
                  {certificateFormData.expirationDate}
                </p>
                <p>
                  <strong>Ảnh:</strong> {/* Show a temp image */}
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ width: 200, height: "auto" }}
                    />
                  )}
                </p>
              </div>
            </div>
            <div className="gpcertiadd-confirm-footer">
              <button
                type="button"
                className="gpcertiadd-cancel-button"
                onClick={() => setShowConfirmModal(false)}
              >
                Hủy
              </button>
              <button
                type="button"
                className="gpcertiadd-add-button"
                onClick={handleConfirmAdd}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateProductCertificatePopup;
