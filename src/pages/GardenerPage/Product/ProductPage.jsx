import { useState, useEffect } from "react";
import "./ProductPage.css";

function GardenerProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const products = [
    {
      id: 1,
      name: "Rau cải",
      category: "Rau củ",
      price: "50.000đ/kg",
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Rau cải",
      category: "Rau củ",
      price: "50.000đ/kg",
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Rau cải",
      category: "Rau củ",
      price: "50.000đ/kg",
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Rau cải",
      category: "Rau củ",
      price: "50.000đ/kg",
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Rau cải",
      category: "Rau củ",
      price: "50.000đ/kg",
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Rau cải",
      category: "Rau củ",
      price: "50.000đ/kg",
      status: "Đang bán",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const totalPages = 10;

  const SearchIcon = () => (
    <svg
      className="icon search-icon"
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
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );

  const FilterIcon = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4Z"
      />
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m15 18-6-6 6-6"
      />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m9 18 6-6-6-6"
      />
    </svg>
  );

  const MoreVerticalIcon = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
    </svg>
  );

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

  return (
    <div className="container">
      <div className="max-width">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <h1>Quản lý sản phẩm</h1>
            <p>Tổng cộng {products.length} sản phẩm</p>
          </div>
          <button className="create-button">
            <PlusIcon />
            Tạo sản phẩm
          </button>
        </div>

        {/* Search and Filter */}
        <div className="search-filter-container">
          <div className="search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="filter-button">
            <FilterIcon />
            Bộ lọc
          </button>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                />
                <button
                  className="more-actions-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(
                      openDropdown === product.id ? null : product.id
                    );
                  }}
                >
                  <MoreVerticalIcon />
                </button>
                {openDropdown === product.id && (
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item"
                      onClick={() => console.log("Edit", product.id)}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => console.log("Duplicate", product.id)}
                    >
                      Nhân bản
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => console.log("View details", product.id)}
                    >
                      Xem chi tiết
                    </button>
                    <button
                      className="dropdown-item danger"
                      onClick={() => console.log("Delete", product.id)}
                    >
                      Xóa
                    </button>
                  </div>
                )}
              </div>
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <span className="status-badge">{product.status}</span>
                </div>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <p className="pagination-info">
            Hiển thị từ 1 đến 6 trong tổng số XX kết quả
          </p>
          <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon />
            </button>

            {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
              <button
                key={index}
                className={`pagination-button ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}

            <button
              className="pagination-button"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GardenerProductPage;
