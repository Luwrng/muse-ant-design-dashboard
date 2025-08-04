import React from "react";
import { X } from "lucide-react";
import "./GPackageOrderHistoryDetail.css";

function GPackageOrderHistoryDetail({ isOpen, onClose, paymentDetail }) {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString(); // Adjust format as needed
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };
  const Statusmap = (status) => {
    switch (status) {
      case "SUCCESS":
        return "Thành công";
      case "PENDING":
        return "Chờ duyệt";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className="gpayhistorydetail-modal-overlay" onClick={onClose}>
      <div
        className="gpayhistorydetail-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="gpayhistorydetail-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="gpayhistorydetail-close-icon" />
        </button>
        <h2 className="gpayhistorydetail-title">Thông tin thanh toán</h2>
        <div className="gpayhistorydetail-details-grid">
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">ID đơn hàng:</span>
            <span className="gpayhistorydetail-value">
              {paymentDetail.orderId}
            </span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">ID thanh toán:</span>
            <span className="gpayhistorydetail-value">
              {paymentDetail.paymentId}
            </span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Tên gói:</span>
            <span className="gpayhistorydetail-value">
              {paymentDetail.packageName}
            </span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">
              Tổng tiền thanh toán:
            </span>
            <span className="gpayhistorydetail-value">
              {paymentDetail.paymentAmount} {paymentDetail.currency}
            </span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">
              Phương thức thanh toán:
            </span>
            <span className="gpayhistorydetail-value">
              {paymentDetail.paymentMethod}
            </span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Ngày thanh toán:</span>
            <span className="gpayhistorydetail-value">
              {formatDate(paymentDetail.paymentDate)}
            </span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Trạng thái:</span>
            <span
              className={`gpayhistorydetail-value gpayhistorydetail-status-${paymentDetail.status.toLowerCase()}`}
            >
              {Statusmap(paymentDetail.status)}
            </span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">
              Tổng tiền của đơn hàng:
            </span>
            <span className="gpayhistorydetail-value">
              {paymentDetail.orderTotalAmount} {paymentDetail.currency}
            </span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">
              Trạng thái đơn hàng:
            </span>
            <span className="gpayhistorydetail-value">
              {Statusmap(paymentDetail.orderStatus)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GPackageOrderHistoryDetail;
