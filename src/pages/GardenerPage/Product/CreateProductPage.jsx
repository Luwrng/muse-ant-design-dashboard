import React, { useEffect } from "react";
import { useState } from "react";
import { X } from "lucide-react";
import "./CreateProductPage.css";
import productService from "../../services/apiServices/productService";

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

  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryTempName, setNewCategoryTempName] = useState("");
  const [newCategoryTempDescription, setNewCategoryTempDescription] =
    useState("");
  const [isNewCate, setIsNewCate] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const gardenerId = localStorage.getItem("account_id");
        const result = await productService.getGardenerProductCategoriesList(
          gardenerId
        );
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

  const handleCategorySelect = (value) => {
    if (value === "new") {
      setIsNewCate(true);
      setShowNewCategoryModal(true);
      setFormData((prev) => ({
        ...prev,
        productCategoryId: null, // Set to null for new category
        name: "",
        description: "",
      }));
      setNewCategoryTempName("");
      setNewCategoryTempDescription("");
    } else {
      const selectedCategory = categories.find(
        (cat) => cat.productCategoryId === value
      );
      if (selectedCategory) {
        setFormData((prev) => ({
          ...prev,
          productCategoryId: selectedCategory.productCategoryId,
          name: selectedCategory.name,
          description: selectedCategory.description,
        }));
      } else {
        resetCategorySelection();
      }
    }
  };

  const handleNewCategorySubmit = () => {
    if (newCategoryTempName.trim() === "") {
      alert("Tên danh mục không được để trống");
    }

    setFormData((prev) => ({
      ...prev,
      productCategoryId: null,
      name: newCategoryTempName,
      description: newCategoryTempDescription,
    }));
    setShowNewCategoryModal(false);
  };

  const resetCategorySelection = () => {
    setFormData((prev) => ({
      ...prev,
      productCategoryId: "", // Reset to empty string to select "Chọn phân loại"
      name: "",
      description: "",
    }));
    setShowNewCategoryModal(false);
    setIsNewCate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Creating product:", formData);

    try {
      const gardenerId = localStorage.getItem("account_id");
      await productService.createProduct(gardenerId, formData);
    } catch (err) {
      console.log(err);
    }

    onBack();
  };

  return (
    <div className="create-product-container">
      <div className="create-product-content">
        <h1 className="cproduct-page-title">Tạo sản phẩm</h1>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="cproduct-form-group">
            <label htmlFor="productName" className="cproduct-form-label">
              Tên sản phẩm <span className="cproduct-required">*</span>
            </label>
            <div className="cproduct-input-container">
              <input
                id="productName"
                type="text"
                className="cproduct-form-input"
                placeholder="Mô tả tên sản phẩm của bạn"
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
              Trạng thái <span className="cproduct-required">*</span>
            </label>
            <select
              id="status"
              className="cproduct-form-input"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              required
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          {/* Product Category Dropdown */}
          <div className="cproduct-form-group">
            <label htmlFor="productCategoryId" className="cproduct-form-label">
              Danh mục sản phẩm <span className="cproduct-required">*</span>
            </label>
            <div className="cproduct-search-input-container">
              <select
                id="productCategoryId"
                className="cproduct-form-input"
                value={
                  formData.productCategoryId === null
                    ? "new"
                    : formData.productCategoryId
                }
                onChange={(e) => handleCategorySelect(e.target.value)}
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option
                    key={category.productCategoryId}
                    value={category.productCategoryId}
                  >
                    {category.name}
                  </option>
                ))}
                <option value="new">Tạo mới</option>
              </select>
            </div>
          </div>

          {/* Category Name (display only if a category is selected or new one is being created) */}
          {(formData.productCategoryId ||
            formData.productCategoryId === null) && (
            <div className="cproduct-form-group">
              <label htmlFor="name" className="cproduct-form-label">
                Tên danh mục
              </label>
              <input
                id="name"
                type="text"
                className="cproduct-form-input"
                value={formData.name}
                readOnly={formData.productCategoryId !== null} // Read-only if existing category
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                placeholder="Tên danh mục"
                disabled={!isNewCate}
              />
            </div>
          )}

          {/* Category Description (display only if a category is selected or new one is being created) */}
          {(formData.productCategoryId ||
            formData.productCategoryId === null) && (
            <div className="cproduct-form-group">
              <label htmlFor="description" className="cproduct-form-label">
                Mô tả danh mục
              </label>
              <textarea
                id="description"
                className="cproduct-form-input"
                value={formData.description}
                readOnly={formData.productCategoryId !== null} // Read-only if existing category
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows="3"
                placeholder="Mô tả chi tiết danh mục"
                disabled={!isNewCate}
              ></textarea>
            </div>
          )}

          {/* Price */}
          <div className="cproduct-form-group">
            <label htmlFor="price" className="cproduct-form-label">
              Giá tiền <span className="cproduct-required">*</span>
            </label>
            <div className="cproduct-search-input-container">
              <input
                id="price"
                type="number"
                className="cproduct-search-input"
                placeholder="Nhập giá bán"
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
          </div>

          {/* Currency */}
          <div className="cproduct-form-group">
            <label htmlFor="currency" className="cproduct-form-label">
              Tiền tệ
            </label>
            <input
              id="currency"
              type="text"
              className="cproduct-form-input"
              placeholder="Ví dụ: VND, USD"
              value={formData.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
            />
          </div>

          {/* Weight Unit */}
          <div className="cproduct-form-group">
            <label htmlFor="weightUnit" className="cproduct-form-label">
              Đơn vị cân nặng (giá tiền)
            </label>
            <input
              id="weightUnit"
              type="text"
              className="cproduct-form-input"
              placeholder="Ví dụ: kg, g"
              value={formData.weightUnit}
              onChange={(e) => handleInputChange("weightUnit", e.target.value)}
            />
          </div>

          {/* Available Date */}
          <div className="cproduct-form-group">
            <label htmlFor="availabledDate" className="cproduct-form-label">
              Ngày giá tiền có hiệu lực
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

      {/* New Category Modal */}
      {showNewCategoryModal && (
        <div
          className="cproduct-modal-overlay"
          onClick={resetCategorySelection}
        >
          {" "}
          {/* Click overlay to reset */}
          <div
            className="cproduct-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            {/* Prevent clicks inside from closing */}
            <div className="cproduct-modal-header">
              <h2>Tạo danh mục mới</h2>
              <button
                className="cproduct-modal-close"
                onClick={resetCategorySelection}
              >
                {" "}
                {/* Close button to reset */}
                <X size={20} />
              </button>
            </div>
            <div className="cproduct-modal-body">
              <div className="cproduct-form-group">
                <label htmlFor="newname" className="cproduct-form-label">
                  Tên danh mục mới <span className="cproduct-required">*</span>
                </label>
                <input
                  id="newname"
                  type="text"
                  className="cproduct-form-input"
                  value={newCategoryTempName}
                  onChange={(e) => setNewCategoryTempName(e.target.value)}
                  required
                />
              </div>
              <div className="cproduct-form-group">
                <label htmlFor="newdescription" className="cproduct-form-label">
                  Mô tả danh mục mới
                </label>
                <textarea
                  id="newdescription"
                  className="cproduct-form-input"
                  value={newCategoryTempDescription}
                  onChange={(e) =>
                    setNewCategoryTempDescription(e.target.value)
                  }
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="cproduct-modal-footer">
              <button
                type="button"
                className="cproduct-cancel-button"
                onClick={resetCategorySelection}
              >
                {" "}
                {/* Cancel button to reset */}
                Hủy
              </button>
              <button
                type="button"
                className="cproduct-create-button"
                onClick={handleNewCategorySubmit}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateProductPage;
