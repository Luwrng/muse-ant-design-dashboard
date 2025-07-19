import React, { useEffect } from "react";
import { useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { FaPenToSquare } from "react-icons/fa6";
import GCreateProductCategory from "./GCreateProductCategory";
import GEditProductCategory from "./GEditProductCategory";
import GDeleteProductCategory from "./GDeleteProductCategory";
import LoadingOverlay from "./LoadingPopup/LoadingOverlay";
import ErrorModal from "./ErrorModal/ErrorModal";
import SuccessModal from "./SuccessModal/GSuccessModal";
import "./GProductCategory.css";
import productService from "../../services/apiServices/productService";

function GProductCategory() {
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const gardenerId = localStorage.getItem("account_id");
        const result = await productService.getGardenerProductCategories(
          gardenerId,
          currentPage,
          10
        );

        setCategories(result.items);
        setTotalPages(result.totalPages);
        setTotalResults(result.total);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategory();
  }, [currentPage]);

  const handleDelete = (id) => {
    const category = categories.find((cat) => cat.productCategoryId === id);
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  //Temp
  const handleEdit = (id) => {
    const category = categories.find((cat) => cat.productCategoryId === id);
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  //Create
  const handleCreateCategory = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleSubmitCategory = async (categoryData) => {
    console.log("Creating category:", categoryData);
    setIsLoading(true);
    try {
      const gardenerId = localStorage.getItem("account_id");
      await productService.createProductCategory(gardenerId, categoryData);
      setSuccessMessage(
        `Danh mục "${categoryData.name}" đã được tạo thành công!`
      );
      setShowSuccessModal(true);
      setShowCreateModal(false);

      const result = await productService.getGardenerProductCategories(
        gardenerId,
        currentPage,
        10
      );
      setCategories(result.items);
    } catch (err) {
      console.log(err);
    }

    // await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //Handle Delete
  const handleConfirmDelete = async () => {
    setIsLoading(true);
    setShowDeleteModal(false);

    try {
      await productService.deleteProductCategory(
        selectedCategory.productCategoryId
      );
      console.log("Category deleted successfully:", selectedCategory);
      setSuccessMessage(
        `Danh mục "${selectedCategory.name}" đã được xóa thành công!`
      );
      setShowSuccessModal(true);

      const gardenerId = localStorage.getItem("account_id");
      const result = await productService.getGardenerProductCategories(
        gardenerId,
        currentPage,
        10
      );
      setCategories(result.items);
    } catch (err) {
      console.log(err);
      setErrorMessage("Danh mục đang sử dụng cho các sản phẩm, không thể xóa!");
      setShowErrorModal(true);
    }

    setIsLoading(false);
    setSelectedCategory(null);
  };

  //Handle Edit
  const handleConfirmEdit = async (categoryData) => {
    setIsLoading(true);
    setShowEditModal(false);

    try {
      await productService.updateProductCategory(categoryData.id, categoryData);

      console.log("Category updated successfully:", categoryData);
      setSuccessMessage(`Danh mục đã được sửa thành công!`);
      setShowSuccessModal(true);

      const gardenerId = localStorage.getItem("account_id");
      const result = await productService.getGardenerProductCategories(
        gardenerId,
        currentPage,
        10
      );
      setCategories(result.items);
    } catch (err) {
      console.log(err);
      setErrorMessage("Danh mục đang sử dụng cho các sản phẩm, không thể sửa!");
      setShowErrorModal(true);
    }

    setIsLoading(false);
    setSelectedCategory(null);
  };

  const handleCloseModals = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
    setShowErrorModal(false);
    setShowSuccessModal(false);
    setSelectedCategory(null);
  };

  return (
    <div className="gpcategory-category-management">
      <div className="gpcategory-header">
        <div className="gpcategory-header-content">
          <h1 className="gpcategory-title">Quản lý Danh mục Sản phẩm</h1>
          <p className="gpcategory-subtitle">
            Quản lý các danh mục sản phẩm cho vườn rau của bạn
          </p>
        </div>
        <button
          className="gpcategory-create-btn"
          onClick={handleCreateCategory}
        >
          <span className="gpcategory-plus-icon">+</span>
          Tạo danh mục
        </button>
      </div>
      <div className="gpcategory-table-container">
        <table className="gpcategory-category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TÊN DANH MỤC</th>
              <th>MÔ TẢ</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.productCategoryId}>
                <td>{category.productCategoryId}</td>
                <td className="gpcategory-category-name">{category.name}</td>
                <td className="gpcategory-category-description">
                  <div className="gpcategory-category-description-text">
                    {category.description}
                  </div>
                </td>
                <td className="gpcategory-actions">
                  {/*<button
                    className="gpcategory-action-btn gpcategory-view-btn"
                    onClick={() => handleView(category.id)}
                    title="Xem chi tiết"
                  >
                    <EyeFilled />
                  </button> */}
                  <button
                    className="gpcategory-action-btn gpcategory-edit-btn"
                    onClick={() => handleEdit(category.productCategoryId)}
                    title="Chỉnh sửa"
                  >
                    <FaPenToSquare />
                  </button>
                  <button
                    className="gpcategory-action-btn gpcategory-delete-btn"
                    onClick={() => handleDelete(category.productCategoryId)}
                    title="Xóa danh mục"
                  >
                    <DeleteFilled />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginate Part */}
      <div className="gpcategory-pagination">
        <div className="gpcategory-pagination-info">
          Hiển thị từ 1 đến {totalResults > 10 ? 10 : totalResults} trong tổng
          số {totalResults} kết quả
        </div>
        <div className="gpcategory-pagination-controls">
          <button
            className="gpcategory-page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`gpcategory-page-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <span className="gpcategory-page-dots">...</span>
          {[8, 9, 10].map((page) => (
            <button
              key={page}
              className="gpcategory-page-btn"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="gpcategory-page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            ›
          </button>
        </div>
      </div>

      {/* Show create popup */}
      {showCreateModal && (
        <GCreateProductCategory
          onClose={handleCloseModal}
          onSubmit={handleSubmitCategory}
        />
      )}
      {/* Show Delete Popup */}
      {showDeleteModal && selectedCategory && (
        <GDeleteProductCategory
          category={selectedCategory}
          onClose={handleCloseModals}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Show Edit Popup */}
      {showEditModal && selectedCategory && (
        <GEditProductCategory
          category={selectedCategory}
          onClose={handleCloseModals}
          onSubmit={handleConfirmEdit}
        />
      )}

      {/* Show success popup */}
      {showSuccessModal && (
        <SuccessModal message={successMessage} onClose={handleCloseModals} />
      )}

      {/* Show error popup */}
      {showErrorModal && (
        <ErrorModal message={errorMessage} onClose={handleCloseModals} />
      )}

      {/* Show loading popup */}
      {isLoading && <LoadingOverlay />}
    </div>
  );
}

export default GProductCategory;
