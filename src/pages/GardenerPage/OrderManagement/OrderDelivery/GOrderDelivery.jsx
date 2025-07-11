import React from "react";
import { useState } from "react";
import "./GOrderDelivery.css";

function GOrderDelivery({ orderId, onClose }) {
  const [deliveryStatus, setDeliveryStatus] = useState("pending");

  // Sample delivery data
  const deliveryData = {
    id: "DH001",
    orderId: orderId,
    customer: "Green Store",
    total: "800.000",
    unit: "kg",
    createdDate: "16/01/2024",
    status: deliveryStatus,
    statusText: deliveryStatus === "pending" ? "Đang giao" : "Đã giao",
    products: [
      {
        id: 1,
        name: "Hoa hồng đỏ",
        price: "200.000",
        total: 3,
        delivered: 3,
        remaining: 0,
      },
      {
        id: 2,
        name: "Cây xanh mini",
        price: "300.000",
        total: 2,
        delivered: 2,
        remaining: 0,
      },
    ],
  };

  const handleCompleteDelivery = () => {
    setDeliveryStatus("completed");
    console.log("Delivery completed");
  };

  return (
    <div className="godelivery-overlay">
      <div className="godelivery-container">
        <div className="godelivery-header">
          <button className="godelivery-close-btn" onClick={onClose}>
            ✕
          </button>
          <div className="godelivery-actions">
            {deliveryStatus === "pending" && (
              <button
                className="godelivery-complete-btn"
                onClick={handleCompleteDelivery}
              >
                Hoàn thành đơn giao hàng
              </button>
            )}
          </div>
        </div>

        <div className="godelivery-content">
          <div className="godelivery-title-section">
            <h1 className="godelivery-title">
              Chi tiết đơn giao hàng {deliveryData.id}
            </h1>
            <span
              className={`godelivery-status godelivery-status-${deliveryStatus}`}
            >
              {deliveryData.statusText}
            </span>
          </div>

          <div className="godelivery-info">
            <p className="godelivery-customer">
              Khách hàng: {deliveryData.customer}
            </p>
            <p className="godelivery-total">
              Tổng tiền: {deliveryData.total} ₫
            </p>
            <p className="godelivery-unit">
              Đơn vị khối lượng: {deliveryData.unit}
            </p>
            <p className="godelivery-date">
              Ngày tạo: {deliveryData.createdDate}
            </p>
          </div>

          <div className="godelivery-products">
            <h2 className="godelivery-products-title">Danh sách sản phẩm</h2>

            {deliveryData.products.map((product) => (
              <div key={product.id} className="godelivery-product-item">
                <div className="godelivery-product-left">
                  <div className="godelivery-product-info">
                    <h3 className="godelivery-product-name">{product.name}</h3>
                    <p className="godelivery-product-price">
                      {product.price} ₫
                    </p>
                  </div>
                </div>

                <div className="godelivery-product-right">
                  <div className="godelivery-quantity-info">
                    <span className="godelivery-quantity-label">
                      Tổng: {product.total}
                    </span>
                    <span className="godelivery-quantity-label">
                      Đã giao: {product.delivered}
                    </span>
                    <span className="godelivery-quantity-remaining">
                      Còn lại: {product.remaining}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GOrderDelivery;
