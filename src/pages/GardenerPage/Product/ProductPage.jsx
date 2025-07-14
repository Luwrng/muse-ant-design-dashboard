import { useState, useEffect } from "react";
import ProductDetailPage from "./ProductDetailPage";
import CreateProductPage from "./CreateProductPage";
import ProductChangeStatus from "./ProductChangeStatus";
import UpdateProductPrice from "./UpdateProductPrice";
import LoadingPage from "./Loading/LoadingPage";
import PErrorModal from "./ErrorModal/PErrorModal";
import PSuccessModal from "./SuccessModal/PSuccessModal";

import "./ProductPage.css";
import productService from "../../services/apiServices/productService";

function GardenerProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showUpdatePrice, setShowUpdatePrice] = useState(false);
  const [showConfirmStatus, setShowConfirmStatus] = useState(false);
  const [statusAction, setStatusAction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState({ title: "", message: "" });
  const [showError, setShowError] = useState(false);
  const [errorData, setErrorData] = useState({ title: "", message: "" });

  const [activeFilter, setActiveFilter] = useState("all");

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const gardenerId = localStorage.getItem("account_id");
        const result = await productService.getGardenerProducts(
          gardenerId,
          currentPage,
          10,
          "Status"
        );

        setProducts(result.items);
        setTotalPages(result.totalPages);
        setTotalResults(result.total);
      } catch (err) {
        console.log(err);
        //Add modal later
      }
    };

    fetchProducts();
  }, [currentPage]);

  // Filter products based on active filter
  const filteredProducts = products.filter((product) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "available") return product.status === "ACTIVE";
    if (activeFilter === "out-of-stock") return product.status === "INACTIVE";
    return true;
  });

  // Get counts for each filter
  const getFilterCounts = () => {
    const available = products.filter((p) => p.status === "ACTIVE").length;
    const outOfStock = products.filter((p) => p.status === "INACTIVE").length;
    return {
      all: products.length,
      available,
      outOfStock,
    };
  };

  const filterCounts = getFilterCounts();

  const SearchIcon = () => (
    <svg
      className="gproduct-icon gproduct-search-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
  );

  const PlusIcon = () => (
    <svg
      className="gproduct-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );

  const FilterIcon = () => (
    <svg
      className="gproduct-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0  0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4Z"
      />
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg
      className="gproduct-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m15 18-6-6 6-6"
      />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      className="gproduct-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m9 18 6-6-6-6"
      />
    </svg>
  );

  // View Product Detail
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  //Create Product
  const handleCreateProduct = () => {
    setShowCreateProduct(true);
  };

  const handleBackToManagement = () => {
    setShowCreateProduct(false);
  };

  const handleClickOutside = (e) => {
    if (
      !e.target.closest(".more-actions-button") &&
      !e.target.closest(".dropdown-menu")
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleUpdatePrice = (product) => {
    setSelectedProduct(product);
    setShowUpdatePrice(true);
    setOpenDropdown(null);
  };

  const handleChangeStatus = (product, action) => {
    setSelectedProduct(product);
    setStatusAction(action);
    setShowConfirmStatus(true);
    setOpenDropdown(null);
  };

  const handlePriceSubmit = async (priceData) => {
    setIsLoading(true);
    setShowUpdatePrice(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccessData({
        title: "Cập nhật giá thành công",
        message: `Giá sản phẩm "${selectedProduct.productName}" đã được cập nhật.`,
      });
      setShowSuccess(true);
    } catch (error) {
      setErrorData({
        title: "Lỗi cập nhật giá",
        message: "Có lỗi xảy ra khi cập nhật giá sản phẩm.",
      });
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusConfirm = async () => {
    setShowConfirmStatus(false);

    // Check constraints after user confirms
    if (selectedProduct.status === "Đang bán" && statusAction === "hide") {
      setErrorData({
        title: "Không thể ẩn sản phẩm",
        message: "Sản phẩm đang hoạt động không thể thay đổi trạng thái.",
      });
      setShowError(true);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      //--->>>
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const actionText = statusAction === "hide" ? "ẩn" : "hiển thị";

      setSuccessData({
        title: "Thay đổi trạng thái thành công",
        message: `Sản phẩm "${selectedProduct.productName}" đã được ${actionText}.`,
      });
      setShowSuccess(true);
    } catch (error) {
      setErrorData({
        title: "Lỗi thay đổi trạng thái",
        message: "Có lỗi xảy ra khi thay đổi trạng thái sản phẩm.",
      });
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Show create product page if showCreateProduct is true
  if (showCreateProduct) {
    return <CreateProductPage onBack={handleBackToManagement} />;
  }

  return (
    <div className="gproduct-container">
      <div className="gproduct-max-width">
        {/* Header */}
        <div className="gproduct-header">
          <div className="gproduct-header-content">
            <h1>Quản lý sản phẩm</h1>
          </div>
          <button
            className="gproduct-create-button"
            onClick={handleCreateProduct}
          >
            <PlusIcon />
            Tạo sản phẩm
          </button>
        </div>

        {/* Search and Filter */}
        {/* Filter Tabs and Search */}
        <div className="gproduct-filter-tabs-container">
          <div className="gproduct-filter-tabs">
            <button
              className={`gproduct-filter-tab ${
                activeFilter === "all" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("all")}
            >
              Tất cả ({filterCounts.all})
            </button>
            <button
              className={`gproduct-filter-tab ${
                activeFilter === "available" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("available")}
            >
              Đang bán ({filterCounts.available})
            </button>
            <button
              className={`gproduct-filter-tab ${
                activeFilter === "out-of-stock" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("out-of-stock")}
            >
              Hết hàng ({filterCounts.outOfStock})
            </button>
          </div>

          <div className="gproduct-search-filter-section">
            <div className="gproduct-search-container">
              <SearchIcon />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="gproduct-search-input"
              />
            </div>
            {/* <button className="gproduct-filter-button">
              <FilterIcon />
              Bộ lọc
            </button> */}
          </div>
        </div>

        {/* Product Grid */}
        <div className="gproduct-product-grid">
          {filteredProducts.map((product) => (
            <div key={product.productId} className="gproduct-product-card">
              <div className="gproduct-product-image">
                <img
                  // src={product.image || "/placeholder.svg"} remove later
                  alt={product.productName}
                />
                <button
                  className="gproduct-more-actions-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(
                      openDropdown === product.productId
                        ? null
                        : product.productId
                    );
                  }}
                >
                  ⋯
                </button>
                {openDropdown === product.productId && (
                  <div className="gproduct-dropdown-menu">
                    <button
                      className="gproduct-dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdatePrice(product);
                      }}
                    >
                      Chỉnh sửa giá
                    </button>
                    <button
                      className="gproduct-dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChangeStatus(product, "hide");
                      }}
                    >
                      Ẩn sản phẩm
                    </button>
                  </div>
                )}
              </div>
              <div
                className="gproduct-product-content"
                onClick={() => handleProductClick(product)}
              >
                <h3 className="gproduct-product-name">{product.productName}</h3>
                <div className="gproduct-product-info">
                  <span className="gproduct-product-category">
                    {product.productCategory}
                  </span>
                  <span
                    className={`gproduct-status-badge ${
                      product.status === "Hết hàng" ? "out-of-stock" : ""
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                <div className="gproduct-product-footer">
                  <span className="gproduct-product-price">
                    {new Intl.NumberFormat("vi-VN").format(product.price)}đ /
                    {product.weightUnit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="gproduct-pagination-container">
          <p className="gproduct-pagination-info">
            Hiển thị từ 1 đến {filteredProducts.length} trong tổng số{" "}
            {filteredProducts.length} kết quả
          </p>
          <div className="gproduct-pagination-controls">
            <button
              className="gproduct-pagination-button"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon />
            </button>

            {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
              <button
                key={index}
                className={`gproduct-pagination-button ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}

            <button
              className="gproduct-pagination-button"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* Product Detail */}
        <ProductDetailPage
          product={selectedProduct}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetail}
          onUpdatePrice={handleUpdatePrice}
          onChangeStatus={handleChangeStatus}
        />

        {/* Update Price Popup */}
        <UpdateProductPrice
          product={selectedProduct}
          isOpen={showUpdatePrice}
          onClose={() => setShowUpdatePrice(false)}
          onSubmit={handlePriceSubmit}
        />

        {/* Update Product Status */}
        <ProductChangeStatus
          product={selectedProduct}
          isOpen={showConfirmStatus}
          onClose={() => setShowConfirmStatus(false)}
          onConfirm={handleStatusConfirm}
          action={statusAction}
        />

        {/* Loading Page */}
        <LoadingPage isOpen={isLoading} />

        {/* Success Popup */}
        <PSuccessModal
          isOpen={showSuccess}
          title={successData.title}
          message={successData.message}
          onClose={() => setShowSuccess(false)}
        />

        {/* Error Popup */}
        <PErrorModal
          isOpen={showError}
          title={errorData.title}
          message={errorData.message}
          onClose={() => setShowError(false)}
        />
      </div>
    </div>
  );
}

export default GardenerProductPage;
