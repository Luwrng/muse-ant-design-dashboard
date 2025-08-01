import { useState, useEffect, useRef } from "react";
import { PlusIcon, SearchIcon, MoreHorizontalIcon } from "lucide-react";
import ProductDetailPage from "./ProductDetailPage";
import CreateProductPage from "./CreateProductPage";
import ProductChangeStatus from "./ProductChangeStatus";
import UpdateProductPrice from "./UpdateProductPrice";
import LoadingPage from "./Loading/LoadingPage";
import PErrorModal from "./ErrorModal/PErrorModal";
import PSuccessModal from "./SuccessModal/PSuccessModal";
import Paginate from "../../../components/paginate/Paginate";
import CreateProductCertificatePopup from "./CreateProductCertificatePopup";
import "./ProductPage.css";
import productService from "../../services/apiServices/productService";

function GardenerProductPage() {
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null); // State to manage open dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showAddCertificate, setShowAddCertificate] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showUpdatePrice, setShowUpdatePrice] = useState(false);
  const [showConfirmStatus, setShowConfirmStatus] = useState(false);
  const [statusAction, setStatusAction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState({ title: "", message: "" });
  const [showError, setShowError] = useState(false);
  const [errorData, setErrorData] = useState({ title: "", message: "" });

  const [filterTabs, setFilterTabs] = useState([
    { id: "ACTIVE", label: "Đang bán" },
    { id: "INACTIVE", label: "Hết hàng" },
  ]);
  const mapstatus = (status) => {
    switch (status) {
      case "ACTIVE":
        return "Đang bán";
      case "INACTIVE":
        return "Hết hàng";
      default:
        return "Không xác định";
    }
  };

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResult, setTotalResults] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, activeTab, searchTerm]);

  const fetchProducts = async () => {
    try {
      const gardenerId = localStorage.getItem("account_id");
      const result = await productService.getGardenerProducts(
        gardenerId,
        currentPage,
        10,
        "Status",
        activeTab,
        searchTerm
      );

      setProducts(result.items);
      setTotalPages(result.totalPages);
      setTotalResults(result.total);
    } catch (err) {
      console.log(err);
      //Add modal later
    }
  };

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

  const handleProductClick = (product) => {
    setIsDropdownOpen(false);
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleAddCertificateClick = (product) => {
    setIsDropdownOpen(false);
    setSelectedProduct(product);
    setShowAddCertificate(true);
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseAddCertificate = () => {
    setShowAddCertificate(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page);
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

  const handleAddCertificate = async (newCertificate) => {
    try {
      await productService.cerateProductCertificate(
        selectedProduct.productId,
        newCertificate
      );

      setShowAddCertificate(false);
    } catch (err) {
      console.log(err);
    }
  };

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
      if (priceData.option === "previous") {
        await productService.setProductCurrentPrice(
          selectedProduct.productId,
          priceData.value
        );
      } else if (priceData.option === "new") {
        await productService.createProductPrice(
          selectedProduct.productId,
          priceData.value
        );
      }

      fetchProducts(currentPage);
      setSuccessData({
        title: "Cập nhật giá thành công",
        message: `Giá sản phẩm "${selectedProduct.productName}" đã được cập nhật.`,
      });

      setShowSuccess(true);

      setSelectedProduct((prev) => {
        const updated = products.find((p) => p.productId === prev.productId);
        return updated ?? prev;
      });
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

      setSelectedProduct((prev) => {
        const updated = products.find((p) => p.productId === prev.productId);
        return updated ?? prev;
      });
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
              {tab.label}
            </button>
          ))}
        </div>
        <div className="gproduct-search-container">
          <SearchIcon className="gproduct-search-icon" />
          <input
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            className="gproduct-input gproduct-search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchTerm(searchInput); // this triggers the real search
                setCurrentPage(1); // reset pagination
              }
            }}
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
              <th className="gproduct-table-head">Đơn vị tính giá</th>
              <th className="gproduct-table-head">Chứng chỉ sản phẩm</th>
              <th className="gproduct-table-head gproduct-action-header">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="gproduct-table-body">
            {products.length > 0 ? (
              products.map((product) => (
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
                        product.certificates && product.certificates.length > 0
                          ? "gproduct-status-selling"
                          : "gproduct-status-out-of-stock"
                      }`}
                    >
                      {product.certificates.length > 0
                        ? "Có chứng chỉ"
                        : "Không có chứng chỉ"}
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
                              onClick={() => handleAddCertificateClick(product)}
                            >
                              Thêm chứng chỉ
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
                  Hiện không có sản phẩm{" "}
                  {activeTab === "ACTIVE" ? "đang bán" : "hết hàng"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Paginate
        currentPage={currentPage}
        totalPages={totalPage}
        totalResults={totalResult}
        onPageChange={handlePageChange}
      />

      {/* Product Detail */}
      <ProductDetailPage
        product={selectedProduct}
        setProduct={setSelectedProduct}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetail}
        onUpdatePrice={handleUpdatePrice}
        onChangeStatus={handleChangeStatus}
        onAddCertificate={handleAddCertificateClick}
      />

      {/* Add Certificate */}
      {showAddCertificate && (
        <CreateProductCertificatePopup
          onClose={handleCloseAddCertificate}
          onAddCertificate={handleAddCertificate}
        />
      )}

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
