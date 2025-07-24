import React from "react";
import "./CreateProductCertificatePopup.css";
import { useState } from "react";
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

  const handleInputChange = (field, value) => {
    setCertificateFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
      !certificateFormData.certificateImageUrl
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setShowConfirmModal(true); // Show confirmation modal
  };

  const handleConfirmAdd = () => {
    onAddCertificate(certificateFormData);
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
          <h2>Add Certificate</h2>
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
                Certificate Name <span className="gpcertiadd-required">*</span>
              </label>
              <input
                id="certificateName"
                type="text"
                className="gpcertiadd-form-input"
                placeholder="Enter certificate name"
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
                Issuing Organization{" "}
                <span className="gpcertiadd-required">*</span>
              </label>
              <input
                id="issuingOrganization"
                type="text"
                className="gpcertiadd-form-input"
                placeholder="Enter issuing organization"
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
                Certificate Number{" "}
                <span className="gpcertiadd-required">*</span>
              </label>
              <input
                id="certificateNumber"
                type="text"
                className="gpcertiadd-form-input"
                placeholder="Enter certificate number"
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
                  Issued Date <span className="gpcertiadd-required">*</span>
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
                  Expiration Date <span className="gpcertiadd-required">*</span>
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
                Certificate Image URL{" "}
                <span className="gpcertiadd-required">*</span>
              </label>
              <input
                id="certificateImageUrl"
                type="url"
                className="gpcertiadd-form-input"
                placeholder="Enter image URL"
                value={certificateFormData.certificateImageUrl}
                onChange={(e) =>
                  handleInputChange("certificateImageUrl", e.target.value)
                }
                required
              />
            </div>
          </div>
          <div className="gpcertiadd-modal-footer">
            <button
              type="button"
              className="gpcertiadd-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="gpcertiadd-add-button">
              Add Certificate
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
              <h2>Confirm Certificate Data</h2>
              <button
                className="gpcertiadd-modal-close"
                onClick={() => setShowConfirmModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="gpcertiadd-confirm-body">
              <p>Are you sure you want to add this certificate?</p>
              <p className="gpcertiadd-confirm-warning">
                Once added, certificate data cannot be changed.
              </p>
              <div className="gpcertiadd-confirm-details">
                <p>
                  <strong>Name:</strong> {certificateFormData.certificateName}
                </p>
                <p>
                  <strong>Organization:</strong>{" "}
                  {certificateFormData.issuingOrganization}
                </p>
                <p>
                  <strong>Number:</strong>{" "}
                  {certificateFormData.certificateNumber}
                </p>
                <p>
                  <strong>Issued:</strong> {certificateFormData.issuedDate}
                </p>
                <p>
                  <strong>Expires:</strong> {certificateFormData.expirationDate}
                </p>
                <p>
                  <strong>Image URL:</strong>{" "}
                  {certificateFormData.certificateImageUrl}
                </p>
              </div>
            </div>
            <div className="gpcertiadd-confirm-footer">
              <button
                type="button"
                className="gpcertiadd-cancel-button"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="gpcertiadd-add-button"
                onClick={handleConfirmAdd}
              >
                Confirm Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateProductCertificatePopup;
