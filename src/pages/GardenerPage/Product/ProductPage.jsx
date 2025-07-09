import { useState, useEffect } from "react";
import ProductDetailPage from "./ProductDetailPage";
import CreateProductPage from "./CreateProductPage";
import "./ProductPage.css";

function GardenerProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  const products = [
    {
      id: 1,
      name: "Rau cải",
      category: "Rau củ",
      price: 50000,
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Rau cải",
      category: "Rau củ",
      price: 50000,
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Rau cải",
      category: "Rau củ",
      price: 50000,
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Rau cải",
      category: "Rau củ",
      price: 50000,
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Rau cải",
      category: "Rau củ",
      price: 50000,
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Rau cải",
      category: "Rau củ",
      price: 50000,
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const totalPages = 10;

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
            <p>Tổng cộng {products.length} sản phẩm</p>
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
        <div className="gproduct-search-filter-container">
          <div className="gproduct-search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="gproduct-search-input"
            />
          </div>
          <button className="gproduct-filter-button">
            <FilterIcon />
            Bộ lọc
          </button>
        </div>

        {/* Product Grid */}
        <div className="gproduct-product-grid">
          {products.map((product) => (
            <div key={product.id} className="gproduct-product-card">
              <div className="gproduct-product-image">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                />
                <button
                  className="gproduct-more-actions-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(
                      openDropdown === product.id ? null : product.id
                    );
                  }}
                >
                  ⋯
                </button>
                {openDropdown === product.id && (
                  <div className="gproduct-dropdown-menu">
                    <button
                      className="gproduct-dropdown-item"
                      onClick={() => console.log("Edit", product.id)}
                    >
                      Chỉnh sửa giá
                    </button>
                    <button
                      className="gproduct-dropdown-item"
                      onClick={() => console.log("Duplicate", product.id)}
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
                <h3 className="gproduct-product-name">{product.name}</h3>
                <div className="gproduct-product-info">
                  <span className="gproduct-product-category">
                    {product.category}
                  </span>
                  <span className="gproduct-status-badge">
                    {product.status}
                  </span>
                </div>
                <div className="gproduct-product-footer">
                  <span className="gproduct-product-price">
                    {new Intl.NumberFormat("vi-VN").format(product.price)}đ /kg
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="gproduct-pagination-container">
          <p className="gproduct-pagination-info">
            Hiển thị từ 1 đến 6 trong tổng số XX kết quả
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
        <ProductDetailPage
          product={selectedProduct}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetail}
        />
      </div>
    </div>
  );
}

export default GardenerProductPage;
