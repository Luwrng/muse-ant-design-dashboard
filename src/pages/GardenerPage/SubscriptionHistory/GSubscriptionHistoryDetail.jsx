import React from 'react'
import "./GSubscriptionHistoryDetail.css";

function GSubscriptionHistoryDetail({ subscription, onClose }) {
  if (!subscription) return null

  return (
    <div className="gsbchistorydetail-modal-overlay" onClick={onClose}>
      <div className="gsbchistorydetail-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="gsbchistorydetail-modal-header">
          <h2 className="gsbchistorydetail-modal-title">Payment Detail</h2>
          <button className="gsbchistorydetail-modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="gsbchistorydetail-modal-body">
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">Subscription ID:</span>
            <span className="gsbchistorydetail-value">{subscription.subscriptionId}</span>
          </div>
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">Status:</span>
            <span className={`gsbchistorydetail-value gsbchistorydetail-status-${subscription.status.toLowerCase()}`}>
              {subscription.status}
            </span>
          </div>
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">Subscription Type:</span>
            <span className="gsbchistorydetail-value">{subscription.subscriptionType}</span>
          </div>
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">Gardener Phone Number:</span>
            <span className="gsbchistorydetail-value">{subscription.gardenerPhoneNumber}</span>
          </div>
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">Service Package Name:</span>
            <span className="gsbchistorydetail-value">{subscription.servicePackageName}</span>
          </div>
          <div className="gsbchistorydetail-detail-item">
            <span className="gsbchistorydetail-label">Service Package Price:</span>
            <span className="gsbchistorydetail-value">${subscription.servicePackagePrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GSubscriptionHistoryDetail
