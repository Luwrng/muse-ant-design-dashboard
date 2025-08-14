import React, { useEffect } from "react";
import { useState } from "react";
import "./GOrderDelivery.css";
import gardenerOrderService from "../../../services/apiServices/gardenerOrderService";

function GOrderDelivery({ orderId, onClose }) {
  return (
    <div className="godelivery-popup-overlay">
      <div className="godelivery-popup-content">
        <div className="godelivery-popup-header">
          <h2>Chi tiết đơn giao hàng cho đơn #{orderId}</h2>
          <button className="godelivery-popup-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="godelivery-popup-body">
          <p>Đây là nội dung chi tiết của đơn giao hàng.</p>
          <p>
            Bạn có thể hiển thị danh sách các phiếu giao hàng liên quan đến đơn
            hàng này tại đây.
          </p>
          {/* Add more details or a list of deliveries here */}
        </div>
      </div>
    </div>
  );
}

export default GOrderDelivery;
