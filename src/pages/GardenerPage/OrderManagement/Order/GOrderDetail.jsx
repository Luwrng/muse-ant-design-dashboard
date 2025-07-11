import React from "react";
import { useState } from "react";
import GOrderDelivery from "../OrderDelivery/GOrderDelivery";
import "./GOrderDetail.css";

function GOrderDetail({ orderId, onBack }) {
  const [isCreatingDelivery, setIsCreatingDelivery] = useState(false);
  const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [deliveryQuantities, setDeliveryQuantities] = useState({});
  const [errors, setErrors] = useState({});

  // Sample order data
  const orderData = {
    1: {
      id: "ORD001",
      customer: "Green Store",
      total: "1.500.000",
      unit: "kg",
      createdDate: "15/01/2024",
      status: "pending",
      statusText: "Chờ xử lý",
      products: [
        {
          id: 1,
          name: "Hoa hồng đỏ",
          price: "200.000",
          total: 5,
          delivered: 0,
          remaining: 5,
        },
        {
          id: 2,
          name: "Hoa tulip vàng",
          price: "150.000",
          total: 3,
          delivered: 0,
          remaining: 3,
        },
        {
          id: 3,
          name: "Cây xanh mini",
          price: "300.000",
          total: 2,
          delivered: 0,
          remaining: 2,
        },
      ],
    },
    6: {
      id: "ORD006",
      customer: "Green Store",
      total: "1.500.000",
      unit: "kg",
      createdDate: "15/01/2024",
      status: "pending",
      statusText: "Chờ xử lý",
      products: [
        {
          id: 1,
          name: "Hoa hồng đỏ",
          price: "200.000",
          total: 5,
          delivered: 0,
          remaining: 5,
        },
        {
          id: 2,
          name: "Hoa tulip vàng",
          price: "150.000",
          total: 3,
          delivered: 0,
          remaining: 3,
        },
        {
          id: 3,
          name: "Cây xanh mini",
          price: "300.000",
          total: 2,
          delivered: 0,
          remaining: 2,
        },
      ],
    },
  };

  const order = orderData[orderId] || orderData[1];

  const handleQuantityChange = (productId, value) => {
    const product = order.products.find((p) => p.id === productId);
    const quantity = Number.parseInt(value) || 0;

    if (quantity > product.remaining) {
      setErrors({
        ...errors,
        [productId]: `Số lượng không được vượt quá ${product.remaining}`,
      });
    } else {
      setErrors({
        ...errors,
        [productId]: null,
      });
    }

    setDeliveryQuantities({
      ...deliveryQuantities,
      [productId]: quantity,
    });
  };

  const getSelectedProductsCount = () => {
    return Object.values(deliveryQuantities).filter((qty) => qty > 0).length;
  };

  const handleCreateDelivery = () => {
    console.log("Creating delivery with quantities:", deliveryQuantities);
    setIsCreatingDelivery(false);
    setDeliveryQuantities({});
  };

  return (
    <div className="godetail-container">
      <div className="godetail-header">
        <button className="godetail-back-btn" onClick={onBack}>
          ← Quay lại
        </button>
        <div className="godetail-actions">
          {!isCreatingDelivery && (
            <>
              <button
                className="godetail-create-delivery-btn"
                onClick={() => setIsCreatingDelivery(true)}
              >
                + Tạo đơn giao hàng
              </button>
              <div className="godetail-dropdown">
                <button
                  className="godetail-menu-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  ⋯
                </button>
                {showDropdown && (
                  <div className="godetail-dropdown-menu">
                    <button
                      className="godetail-dropdown-item"
                      onClick={() => {
                        setShowDeliveryPopup(true);
                        setShowDropdown(false);
                      }}
                    >
                      Xem đơn giao hàng
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="godetail-content">
        <div className="godetail-title-section">
          <h1 className="godetail-title">Chi tiết đơn hàng {order.id}</h1>
          <span className={`godetail-status godetail-status-${order.status}`}>
            {order.statusText}
          </span>
        </div>

        <div className="godetail-info">
          <p className="godetail-customer">Khách hàng: {order.customer}</p>
          <p className="godetail-total">Tổng tiền: {order.total} ₫</p>
          <p className="godetail-unit">Đơn vị khối lượng: {order.unit}</p>
          <p className="godetail-date">Ngày tạo: {order.createdDate}</p>
        </div>

        <div className="godetail-products">
          <h2 className="godetail-products-title">Danh sách sản phẩm</h2>

          {order.products.map((product) => (
            <div key={product.id} className="godetail-product-item">
              <div className="godetail-product-left">
                {isCreatingDelivery && product.remaining > 0 && (
                  <input
                    type="checkbox"
                    className="godetail-product-checkbox"
                    checked={deliveryQuantities[product.id] > 0}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        handleQuantityChange(product.id, 0);
                      }
                    }}
                  />
                )}
                <div className="godetail-product-info">
                  <h3 className="godetail-product-name">{product.name}</h3>
                  <p className="godetail-product-price">{product.price} ₫</p>

                  {isCreatingDelivery && product.remaining > 0 && (
                    <div className="godetail-quantity-input">
                      <label>Số lượng giao:</label>
                      <input
                        type="number"
                        min="0"
                        max={product.remaining}
                        value={deliveryQuantities[product.id] || ""}
                        onChange={(e) =>
                          handleQuantityChange(product.id, e.target.value)
                        }
                        className={errors[product.id] ? "godetail-error" : ""}
                      />
                      <span className="godetail-quantity-limit">
                        / {product.remaining}
                      </span>
                      {errors[product.id] && (
                        <div className="godetail-error-message">
                          {errors[product.id]}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="godetail-product-right">
                <div className="godetail-quantity-info">
                  <span className="godetail-quantity-label">
                    Tổng: {product.total}
                  </span>
                  <span className="godetail-quantity-label">
                    Đã giao: {product.delivered}
                  </span>
                  <span className="godetail-quantity-remaining">
                    Còn lại: {product.remaining}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isCreatingDelivery && (
          <div className="godetail-delivery-actions">
            <button
              className="godetail-create-btn"
              onClick={handleCreateDelivery}
              disabled={getSelectedProductsCount() === 0}
            >
              Tạo phiếu giao hàng ({getSelectedProductsCount()} sản phẩm)
            </button>
            <button
              className="godetail-cancel-btn"
              onClick={() => {
                setIsCreatingDelivery(false);
                setDeliveryQuantities({});
                setErrors({});
              }}
            >
              Hủy
            </button>
          </div>
        )}
      </div>

      {showDeliveryPopup && (
        <GOrderDelivery
          orderId={order.id}
          onClose={() => setShowDeliveryPopup(false)}
        />
      )}
    </div>
  );
}

export default GOrderDetail;
