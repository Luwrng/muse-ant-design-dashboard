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

  // const mockProducts = [
  //   {
  //     id: "1",
  //     name: "Rau cải",
  //     category: "Rau củ",
  //     price: 50000,
  //     weightUnit: "kg",
  //     status: "selling",
  //   },
  //   {
  //     id: "2",
  //     name: "Cà chua",
  //     category: "Rau củ",
  //     price: 35000,
  //     weightUnit: "kg",
  //     status: "selling",
  //   },
  //   {
  //     id: "3",
  //     name: "Khoai tây",
  //     category: "Rau củ",
  //     price: 25000,
  //     weightUnit: "kg",
  //     status: "out_of_stock",
  //   },
  //   {
  //     id: "4",
  //     name: "Bắp cải",
  //     category: "Rau củ",
  //     price: 40000,
  //     weightUnit: "kg",
  //     status: "selling",
  //   },
  //   {
  //     id: "5",
  //     name: "Hành tây",
  //     category: "Rau củ",
  //     price: 15000,
  //     weightUnit: "kg",
  //     status: "selling",
  //   },
  //   {
  //     id: "6",
  //     name: "Tỏi",
  //     category: "Gia vị",
  //     price: 60000,
  //     weightUnit: "kg",
  //     status: "out_of_stock",
  //   },
  // ];

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

  //Filter products based on active filter
  const filteredProducts = products.filter((product) => {
    const matchesTab = activeTab === "all" || product.status === activeTab;
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Get counts for each filter
  const getFilterCounts = () => {
    const available = products.filter((p) => p.status === "ACTIVE").length;
    const outOfStock = products.filter(
      (p) => p.status === "INACTIVE"
    ).length;
    return {
      all: products.length,
      available,
      outOfStock,
    };
  };

  const filterCounts = getFilterCounts();

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

  //#region In code icon
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

  // const FilterIcon = () => (
  //   <svg
  //     className="gproduct-icon"
  //     fill="none"
  //     stroke="currentColor"
  //     viewBox="0 0 24 24"
  //   >
  //     <path
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       strokeWidth={2}
  //       d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0  0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4Z"
  //     />
  //   </svg>
  // );

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
  //#endregion

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

    try{
      const status = selectedProduct.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await productService.changeProductStatus(selectedProduct.productId, status); 
    }
    catch(err){
      console.log(err);
    }


    // // Check constraints after user confirmsw
    // if (selectedProduct.status === "Đang bán" && statusAction === "hide") {
    //   setErrorData({
    //     title: "Không thể ẩn sản phẩm",
    //     message: "Sản phẩm đang hoạt động không thể thay đổi trạng thái.",
    //   });
    //   setShowError(true);
    //   return;
    // }

    // setIsLoading(true);

    // try {
    //   // Simulate API call
    //   //--->>>
    //   await new Promise((resolve) => setTimeout(resolve, 2000));

    //   const actionText = statusAction === "hide" ? "ẩn" : "hiển thị";

    //   setSuccessData({
    //     title: "Thay đổi trạng thái thành công",
    //     message: `Sản phẩm "${selectedProduct.productName}" đã được ${actionText}.`,
    //   });
    //   setShowSuccess(true);
    // } catch (error) {
    //   setErrorData({
    //     title: "Lỗi thay đổi trạng thái",
    //     message: "Có lỗi xảy ra khi thay đổi trạng thái sản phẩm.",
    //   });
    //   setShowError(true);
    // } finally {
    //   setIsLoading(false);
    // }
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
          <button
            className={`gproduct-tab-trigger ${
              activeTab === "all" ? "gproduct-tab-trigger-active" : ""
            }`}
            onClick={() => setActiveTab("all")}
          >
            Tất cả ({products.length})
          </button>
          <button
            className={`gproduct-tab-trigger ${
              activeTab === "selling" ? "gproduct-tab-trigger-active" : ""
            }`}
            onClick={() => setActiveTab("selling")}
          >
            Đang bán (
            {products.filter((p) => p.status === "selling").length})
          </button>
          <button
            className={`gproduct-tab-trigger ${
              activeTab === "out_of_stock" ? "gproduct-tab-trigger-active" : ""
            }`}
            onClick={() => setActiveTab("out_of_stock")}
          >
            Hết hàng (
            {products.filter((p) => p.status === "out_of_stock").length})
          </button>
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
                  <td className="gproduct-table-cell">{product.productCategory}</td>
                  <td className="gproduct-table-cell">
                    {product.price.toLocaleString("vi-VN")} {product.currency}
                  </td>
                  <td className="gproduct-table-cell">{product.weightUnit}</td>
                  <td className="gproduct-table-cell">
                    <span
                      className={`gproduct-status-badge ${
                        product.status === "selling"
                          ? "gproduct-status-selling"
                          : "gproduct-status-out-of-stock"
                      }`}
                    >
                      {product.status === "ACTIVE" ? "Đang bán" : "Hết hàng"}
                    </span>
                  </td>
                  <td className="gproduct-table-cell gproduct-action-cell">
                    <div
                      className="gproduct-dropdown-menu"
                      ref={openDropdownId === product.productId ? dropdownRef : null}
                    >
                      <button
                        className="gproduct-button gproduct-action-trigger"
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === product.productId ? null : product.productId
                          )
                        }
                        aria-haspopup="true"
                        aria-expanded={openDropdownId === product.productId}
                      >
                        <MoreHorizontalIcon className="gproduct-icon" />
                        <span className="sr-only">Open menu</span>
                      </button>
                      {openDropdownId === product.productId && (
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
                              handleChangeStatus(product, "hide");
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

      <div className="gproduct-pagination-info">
        <span>
          Hiển thị {filteredProducts.length > 0 ? 1 : 0} từ{" "}
          {filteredProducts.length} đến tổng số {products.length} kết quả
        </span>
        <div className="gproduct-pagination-buttons">
          <button className="gproduct-button gproduct-pagination-button">
            {"<"}
          </button>
          <button className="gproduct-button gproduct-pagination-button">
            1
          </button>
          <button className="gproduct-button gproduct-pagination-button">
            2
          </button>
          <button className="gproduct-button gproduct-pagination-button">
            3
          </button>
          <button className="gproduct-button gproduct-pagination-button">
            {">"}
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
  );
}

export default GardenerProductPage;
