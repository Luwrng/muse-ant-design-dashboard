import React from "react";
import "./GSubscriptionHistoryDetail.css";

function GSubscriptionHistoryDetail({ subscription, onClose }) {
  if (!subscription) return null;

  return (
    <div className="gsbchistorydetail-modal-overlay" onClick={onClose}>
      <div
        className="gsbchistorydetail-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gsbchistorydetail-modal-header">
          <h2 className="gsbchistorydetail-modal-title">Chi tiết gói đã mua</h2>
          <button
            className="gsbchistorydetail-modal-close-button"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="gsbchistorydetail-modal-body">
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">ID gói:</span>
            <span className="gsbchistorydetail-value">
              {subscription.subscriptionId}
            </span>
          </div>
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">Trạng thái:</span>
            <span
              className={`gsbchistorydetail-value gsbchistorydetail-status-${subscription.status.toLowerCase()}`}
            >
              {subscription.status}
            </span>
          </div>
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">Loại gói:</span>
            <span className="gsbchistorydetail-value">
              {subscription.subscriptionType}
            </span>
          </div>
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">Số điện thoại:</span>
            <span className="gsbchistorydetail-value">
              {subscription.gardenerPhoneNumber}
            </span>
          </div>
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">Tên gói dịch vụ:</span>
            <span className="gsbchistorydetail-value">
              {subscription.servicePackageName}
            </span>
          </div>
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">Giá gói:</span>
            <span className="gsbchistorydetail-value">
              ${subscription.servicePackagePrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GSubscriptionHistoryDetail;
