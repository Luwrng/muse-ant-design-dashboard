import React, { useEffect } from "react";
import { useState } from "react";
import { X } from "lucide-react";
import "./CreateProductPage.css";
import productService from "../../services/apiServices/productService";
import CreateProductCertificatePopup from "./CreateProductCertificatePopup";

function CreateProductPage({ onBack }) {
  const [formData, setFormData] = useState({
    productName: "",
    status: "ACTIVE",
    productCategoryId: "", // Will be null if new category is created
    name: "", // Name of the selected or new category
    description: "", // Description of the selected or new category
    price: "",
    currency: "VND", // Default currency
    availabledDate: new Date().toISOString().split("T")[0],
    isCurrent: true,
    weightUnit: "",
  });

  const [productTags, setProductTags] = useState([]);
  const [newTagInput, setNewTagInput] = useState("");
  const [productCertificates, setProductCertificates] = useState([]);
  const [activeTab, setActiveTab] = useState("basic"); // 'basic' or 'certificates'

  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryTempName, setNewCategoryTempName] = useState("");
  const [newCategoryTempDescription, setNewCategoryTempDescription] =
    useState("");
  const [categories, setCategories] = useState([]);
  const [showAddCertificateModal, setShowAddCertificateModal] = useState(false);

  //Call get product Category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const gardenerId = localStorage.getItem("account_id");
        const result = await productService.getProductCategories(gardenerId);
        setCategories(result.items);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (field, value) => {
    if (field === "price" && Number(value) < 0) return;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && newTagInput.trim() !== "") {
      e.preventDefault();
      setProductTags((prevTags) => [...prevTags, newTagInput.trim()]);
      setNewTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProductTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddCertificate = (newCertificate) => {
    setProductCertificates((prevCertificates) => [
      ...prevCertificates,
      newCertificate,
    ]);
    setShowAddCertificateModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalFormData = {
      ...formData,
      tagNames: productTags, // Changed from productTags to tagNames
      certificates: productCertificates.map((cert) => ({
        // Map certificates to match API
        certificateName: cert.certificateName,
        issuingOrganization: cert.issuingOrganization,
        certificateNumber: cert.certificateNumber,
        issuedDate: new Date(cert.issuedDate).toISOString(), // Convert to ISO string
        expirationDate: new Date(cert.expirationDate).toISOString(), // Convert to ISO string
        imageUrl: cert.certificateImageUrl, // Renamed from certificateImageUrl to imageUrl
      })),
    };

    try {
      const gardenerId = localStorage.getItem("account_id");
      await productService.createProduct(gardenerId, formData);

      //Back to List Page
    } catch (err) {
      console.log(err);
    }

    onBack();
  };

  return (
    <div className="create-product-container">
      <div className="create-product-content">
        <h1 className="cproduct-page-title">Create Product</h1>

        <div className="cproduct-tabs">
          <button
            className={`cproduct-tab-button ${
              activeTab === "basic" ? "active" : ""
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Information
          </button>
          <button
            className={`cproduct-tab-button ${
              activeTab === "certificates" ? "active" : ""
            }`}
            onClick={() => setActiveTab("certificates")}
          >
            Certificates
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === "basic" && (
            <div className="cproduct-tab-content">
              {/* Product Name */}
              <div className="cproduct-form-group">
                <label htmlFor="productName" className="cproduct-form-label">
                  Product Name <span className="cproduct-required">*</span>
                </label>
                <div className="cproduct-input-container">
                  <input
                    id="productName"
                    type="text"
                    className="cproduct-form-input"
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={(e) =>
                      handleInputChange("productName", e.target.value)
                    }
                    maxLength={180}
                    required
                  />
                  <span className="cproduct-character-count">
                    {formData.productName.length}/180
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="cproduct-form-group">
                <label htmlFor="status" className="cproduct-form-label">
                  Status <span className="cproduct-required">*</span>
                </label>
                <select
                  id="status"
                  className="cproduct-form-input"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  required
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              {/* Product Category Dropdown */}
              <div className="cproduct-form-group">
                <label
                  htmlFor="productCategoryId"
                  className="cproduct-form-label"
                >
                  Product Category <span className="cproduct-required">*</span>
                </label>
                <div className="cproduct-search-input-container">
                  <select
                    id="productCategoryId"
                    className="cproduct-form-input"
                    value={formData.productCategoryId}
                    onChange={(e) =>
                      handleInputChange("productCategoryId", e.target.value)
                    }
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option
                        key={category.productCategoryId}
                        value={category.productCategoryId}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Tags */}
              <div className="cproduct-form-group">
                <label htmlFor="productTags" className="cproduct-form-label">
                  Product Tags
                </label>
                <div className="cproduct-tags-input-container">
                  {productTags.map((tag, index) => (
                    <div key={index} className="cproduct-tag-pill">
                      {tag}
                      <button
                        type="button"
                        className="cproduct-tag-remove-button"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <input
                    id="productTags"
                    type="text"
                    className="cproduct-tags-input"
                    placeholder="Add more tags..."
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="cproduct-form-group cproduct-form-group-inline">
                <div className="cproduct-form-group-half">
                  <label htmlFor="price" className="cproduct-form-label">
                    Price <span className="cproduct-required">*</span>
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="cproduct-form-input"
                    placeholder="Enter price"
                    min={0}
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    onKeyDown={(e) => {
                      if (["-", "+", "e"].includes(e.key)) {
                        e.preventDefault(); // Block - + and scientific notation input
                      }
                    }}
                    required
                  />
                </div>
                {/* Currency */}
                <div className="cproduct-form-group-half">
                  <label htmlFor="currency" className="cproduct-form-label">
                    Currency
                  </label>
                  <select
                    id="currency"
                    className="cproduct-form-input"
                    value={formData.currency}
                    onChange={(e) =>
                      handleInputChange("currency", e.target.value)
                    }
                  >
                    <option value="VND">VND</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              {/* Weight Unit */}
              <div className="cproduct-form-group">
                <label htmlFor="weightUnit" className="cproduct-form-label">
                  Weight Unit
                </label>
                <input
                  id="weightUnit"
                  type="text"
                  className="cproduct-form-input"
                  placeholder="e.g., kg, g"
                  value={formData.weightUnit}
                  onChange={(e) =>
                    handleInputChange("weightUnit", e.target.value)
                  }
                />
              </div>

              {/* Available Date */}
              <div className="cproduct-form-group">
                <label htmlFor="availabledDate" className="cproduct-form-label">
                  Available Date
                </label>
                <input
                  id="availabledDate"
                  type="date"
                  className="cproduct-form-input"
                  value={formData.availabledDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    handleInputChange("availabledDate", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="cproduct-tab-content">
              <div className="cproduct-certificates-header">
                <h2 className="cproduct-certificates-title">
                  Product Certificates
                </h2>
                <button
                  type="button"
                  className="cproduct-add-certificate-button"
                  onClick={() => setShowAddCertificateModal(true)}
                >
                  + Add Certificate
                </button>
              </div>
              <div className="cproduct-certificates-list-container">
                {productCertificates.length === 0 ? (
                  <div className="cproduct-no-certificates">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-award"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89L17.18 22l-5.15-3.62L6.82 22l1.703-9.11" />
                    </svg>
                    <p>No certificates added yet</p>
                    <p>Click &quot;Add Certificate&quot; to get started</p>
                  </div>
                ) : (
                  <ul className="cproduct-certificate-list">
                    {productCertificates.map((cert, index) => (
                      <li key={index} className="cproduct-certificate-item">
                        <div className="cproduct-certificate-details">
                          <p className="cproduct-certificate-name">
                            {cert.certificateName}
                          </p>
                          <p className="cproduct-certificate-org">
                            {cert.issuingOrganization}
                          </p>
                          <p className="cproduct-certificate-number">
                            Cert No: {cert.certificateNumber}
                          </p>
                          <p className="cproduct-certificate-dates">
                            Issued: {cert.issuedDate} | Expires:{" "}
                            {cert.expirationDate}
                          </p>
                        </div>
                        {cert.certificateImageUrl && (
                          <img
                            src={cert.certificateImageUrl || "/placeholder.svg"}
                            alt={cert.certificateName}
                            className="cproduct-certificate-image"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="cproduct-form-actions">
            <button
              type="button"
              className="cproduct-cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>
            <button type="submit" className="cproduct-create-button">
              Create Product
            </button>
          </div>
        </form>
      </div>

      {/* Add Certificate Modal */}
      {showAddCertificateModal && (
        <CreateProductCertificatePopup
          onClose={() => setShowAddCertificateModal(false)}
          onAddCertificate={handleAddCertificate}
        />
      )}
    </div>
  );
}

export default CreateProductPage;
