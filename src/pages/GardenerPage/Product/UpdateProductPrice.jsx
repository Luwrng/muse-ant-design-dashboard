import React, { useEffect } from "react";
import "./UpdateProductPrice.css";
import { useState } from "react";
import productService from "../../services/apiServices/productService";

function UpdateProductPrice({ product, isOpen, onClose, onSubmit }) {
  const [priceOption, setPriceOption] = useState("previous");
  const [newPrice, setNewPrice] = useState({
    price: 0,
    currency: "VND",
    weightUnit: "",
    availabledDate: new Date().toISOString().split("T")[0],
    isCurrent: true,
  });
  const [selectedPreviousPrice, setSelectedPreviousPrice] = useState();

  const [prices, setPrices] = useState([]);
  useEffect(() => {
    if (!product || !product.productId) return;

    const fetchPrices = async () => {
      const result = await productService.getProductPrices(product.productId);
      setPrices(result);
    };

    fetchPrices();
  }, [product]);

  if (!isOpen || !product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNewPriceInputChange = (field, value) => {
    setNewPrice((prev) => ({
      ...prev,
      field: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const priceData = {
      option: priceOption,
      value: priceOption === "new" ? newPrice : selectedPreviousPrice,
    };
    onSubmit(priceData);
  };

  const CloseIcon = () => (
    <svg
      className="gppupdate-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div className="gppupdate-overlay" onClick={handleOverlayClick}>
      <div className="gppupdate-modal">
        <div className="gppupdate-header">
          <h2 className="gppupdate-title">Chỉnh sửa giá</h2>
          <button className="gppupdate-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="gppupdate-content">
          <div className="gppupdate-product-info">
            <div className="gppupdate-info-row">
              <span className="gppupdate-info-label">ID:</span>
              <span className="gppupdate-info-value">{product.productId}</span>
            </div>
            <div className="gppupdate-info-row">
              <span className="gppupdate-info-label">Tên sản phẩm:</span>
              <span className="gppupdate-info-value">
                {product.productName}
              </span>
            </div>
            <div className="gppupdate-info-row">
              <span className="gppupdate-info-label">Giá hiện tại:</span>
              <span className="gppupdate-info-value">{product.price}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="gppupdate-form-group">
              <label className="gppupdate-label">Chọn giá mới:</label>
              <select
                className="gppupdate-select"
                value={priceOption}
                onChange={(e) => setPriceOption(e.target.value)}
              >
                <option value="previous">Sử dụng giá trước đó</option>
                <option value="new">Nhập giá mới</option>
              </select>
            </div>

            {priceOption === "previous" && (
              <div className="gppupdate-form-group">
                <label className="gppupdate-label">Chọn giá trước đó:</label>
                <select
                  className="gppupdate-select"
                  value={selectedPreviousPrice}
                  onChange={(e) => setSelectedPreviousPrice(e.target.value)}
                  required
                >
                  <option value="">Chọn giá...</option>
                  {prices.map((priceItem) => (
                    <option
                      key={priceItem.productPriceId}
                      value={priceItem.productPriceId}
                    >
                      {priceItem.price}
                      {priceItem.currency}/{priceItem.weightUnit}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {priceOption === "new" && (
              <div className="gppupdate-form-group">
                <label className="gppupdate-label">Giá mới:</label>
                <input
                  id="price"
                  type="number"
                  placeholder="Nhập giá bán"
                  min={0}
                  value={newPrice.price}
                  onChange={(e) =>
                    handleNewPriceInputChange("price", e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (["-", "+", "e"].includes(e.key)) {
                      e.preventDefault(); // Block - + and scientific notation input
                    }
                  }}
                  required
                />
                <label className="gppupdate-label">Đơn vị khối lượng:</label>
                <input
                  id="weightUnit"
                  type="text"
                  placeholder="Ví dụ: kg, g"
                  value={newPrice.weightUnit}
                  onChange={(e) =>
                    handleNewPriceInputChange("weightUnit", e.target.value)
                  }
                />
                <label className="gppupdate-label">Ngày hiệu lực:</label>
                <input
                  id="availabledDate"
                  type="date"
                  value={newPrice.availabledDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    handleNewPriceInputChange("availabledDate", e.target.value)
                  }
                />
              </div>
            )}

            <div className="gppupdate-actions">
              <button
                type="button"
                className="gppupdate-cancel"
                onClick={onClose}
              >
                Hủy
              </button>
              <button type="submit" className="gppupdate-submit">
                Thay đổi giá
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductPrice;
