import React from "react";
import { useState } from "react";
import "./GPopup.css";

function GApprovePopup({ order, onClose, onConfirm }) {
  const [shippingCost, setShippingCost] = useState("");

  const handleConfirm = () => {
    // Basic validation: ensure shipping cost is a non-negative number
    const cost = Number.parseFloat(shippingCost);
    if (isNaN(cost) || cost < 0) {
      alert("Vui lòng nhập chi phí vận chuyển hợp lệ (số không âm).");
      return;
    }
    onConfirm(order, cost);
  };

  return (
    <div className="gpup-modal-overlay">
      <div className="gpup-modal-content">
        <h2>Xác nhận đơn hàng</h2>
        <div className="gpup-modal-body">
          <label htmlFor="shipping-cost">Chi phí vận chuyển:</label>
          <input
            id="shipping-cost"
            type="number"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
            placeholder="Nhập chi phí vận chuyển"
            min="0"
            aria-label="Shipping Cost"
          />
        </div>
        <div className="gpup-modal-actions">
          <button className="gpup-modal-cancel-btn" onClick={onClose}>
            Hủy
          </button>
          <button className="gpup-modal-confirm-btn" onClick={handleConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default GApprovePopup;
