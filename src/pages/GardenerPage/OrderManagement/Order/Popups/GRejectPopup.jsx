import React from "react";
import { useState } from "react";
import "./GPopup.css";

function GRejectPopup({ order, onClose, onConfirm }) {
  const [rejectReason, setRejectReason] = useState("");

  const handleConfirm = () => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do hủy đơn hàng.");
      return;
    }
    onConfirm(order, rejectReason);
  };

  return (
    <div className="gpup-modal-overlay">
      <div className="gpup-modal-content">
        <h2>Hủy đơn hàng</h2>
        <div className="gpup-modal-body">
          <label htmlFor="reject-reason">Lý do hủy:</label>
          <textarea
            id="reject-reason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Nhập lý do hủy đơn hàng"
            rows="4"
            aria-label="Reject Reason"
          ></textarea>
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

export default GRejectPopup;
