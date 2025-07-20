import { useState, useEffect, useRef } from "react";
import { PlusIcon, SearchIcon, MoreHorizontalIcon } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null); // State to manage open dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const [filterTabs, setFilterTabs] = useState([
    { id: "all", label: "Tất cả", count: 0 },
    { id: "ACTIVE", label: "Đang bán", count: 0 },
    { id: "INACTIVE", label: "Hết hàng", count: 0 },
  ]);

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setFilterTabs([
      { id: "all", label: "Tất cả", count: products.length },
      { id: "ACTIVE", label: "Đang bán", count: products.filter((p) => p.status === "ACTIVE").length },
      { id: "INACTIVE", label: "Hết hàng", count: products.filter((p) => p.status === "INACTIVE").length },
    ]);
  }, [products]);

  const fetchProducts = async (currentPage) => {
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

  //Filter products based on active filter
  const filteredProducts = products.filter((product) => {
    const matchesTab = activeTab === "all" || product.status === activeTab;
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });



  // Close dropdown when clicking outside
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


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


  
  const handleProductClick = (product) => {
    setIsDropdownOpen(false);
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
    fetchProducts();
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
    setIsDropdownOpen(false);
    setSelectedProduct(product);
    setShowUpdatePrice(true);
    setOpenDropdown(null);
  };

  const handleChangeStatus = (product, action) => {
    setIsDropdownOpen(false);
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

    try {
      const status =
        selectedProduct.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await productService.changeProductStatus(
        selectedProduct.productId,
        status
      );

      await fetchProducts(currentPage);
    } catch (err) {
      console.log(err);
    }
  };

  // Show create product page if showCreateProduct is true
  if (showCreateProduct) {
    return <CreateProductPage onBack={handleBackToManagement} />;
  }

  return (
    <div className="gproduct-container">
      <div className="gproduct-header-top">
        <h1 className="gproduct-title">Quản lý sản phẩm</h1>
        <button
          className="gproduct-button gproduct-add-button"
          onClick={handleCreateProduct}
        >
          <PlusIcon className="gproduct-icon" />
          Tạo sản phẩm
        </button>
      </div>

      <div className="gproduct-header-bottom">
        <div className="gproduct-tabs-list">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              className={`gproduct-tab-trigger ${
                activeTab === tab.id ? "gproduct-tab-trigger-active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
        <div className="gproduct-search-container">
          <SearchIcon className="gproduct-search-icon" />
          <input
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            className="gproduct-input gproduct-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="gproduct-table-wrapper">
        <table className="gproduct-table">
          <thead className="gproduct-table-header">
            <tr className="gproduct-table-row">
              <th className="gproduct-table-head">Tên sản phẩm</th>
              <th className="gproduct-table-head">Danh mục</th>
              <th className="gproduct-table-head">Giá</th>
              <th className="gproduct-table-head">Đơn vị khối lượng</th>
              <th className="gproduct-table-head">Trạng thái</th>
              <th className="gproduct-table-head gproduct-action-header">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="gproduct-table-body">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.productId} className="gproduct-table-row">
                  <td className="gproduct-table-cell gproduct-cell-name">
                    {product.productName}
                  </td>
                  <td className="gproduct-table-cell">
                    {product.productCategory}
                  </td>
                  <td className="gproduct-table-cell">
                    {product.price.toLocaleString("vi-VN")} {product.currency}
                  </td>
                  <td className="gproduct-table-cell">{product.weightUnit}</td>
                  <td className="gproduct-table-cell">
                    <span
                      className={`gproduct-status-badge ${
                        product.status === "ACTIVE"
                          ? "gproduct-status-selling"
                          : "gproduct-status-out-of-stock"
                      }`}
                    >
                      {/* {product.status === "ACTIVE" ? "Đang bán" : "Hết hàng"} */}
                      {product.status}
                    </span>
                  </td>
                  <td className="gproduct-table-cell gproduct-action-cell">
                    <div
                      className="gproduct-dropdown-menu"
                      ref={
                        openDropdownId === product.productId
                          ? dropdownRef
                          : null
                      }
                    >
                      <button
                        className="gproduct-button gproduct-action-trigger"
                        onClick={() => {
                          setOpenDropdownId(
                            openDropdownId === product.productId
                              ? null
                              : product.productId
                          );
                          setIsDropdownOpen(true);
                        }}
                        aria-haspopup="true"
                        aria-expanded={openDropdownId === product.productId}
                      >
                        <MoreHorizontalIcon className="gproduct-icon" />
                        <span className="sr-only">Open menu</span>
                      </button>
                      {openDropdownId === product.productId &&
                        isDropdownOpen && (
                          <div className="gproduct-dropdown-content">
                            <button
                              className="gproduct-dropdown-item"
                              onClick={() => handleProductClick(product)}
                            >
                              Xem chi tiết
                            </button>
                            <button
                              className="gproduct-dropdown-item"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdatePrice(product);
                              }}
                            >
                              Sửa giá
                            </button>
                            <button
                              className="gproduct-dropdown-item"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeStatus(
                                  product,
                                  product.status === "ACTIVE" ? "hide" : "show"
                                );
                              }}
                            >
                              Đổi trạng thái
                            </button>
                          </div>
                        )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="gproduct-table-row">
                <td
                  colSpan={6}
                  className="gproduct-table-cell gproduct-no-products"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="gorder-pagination">
          <div className="gorder-pagination-info">
         
          </div>
          <div className="gpost-pagination-controls">
          <button className="gpost-pagination-btn">‹</button>
          {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
            <button
              key={index}
              className={`gpost-pagination-btn ${
                page === 1 ? "gpost-active" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button className="gpost-pagination-btn">›</button>
        </div>
        </div>

      {/* Product Detail */}
      <ProductDetailPage
        product={selectedProduct}
        setProduct={setSelectedProduct}
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
  );
}

export default GardenerProductPage;
