import React from 'react'
import { X } from "lucide-react";
import "./GPackageOrderHistoryDetail.css"

function GPackageOrderHistoryDetail({ isOpen, onClose, paymentDetail }) {
  if (!isOpen) return null

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    try {
      const date = new Date(dateString)
      return date.toLocaleString() // Adjust format as needed
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  return (
    <div className="gpayhistorydetail-modal-overlay" onClick={onClose}>
      <div className="gpayhistorydetail-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="gpayhistorydetail-close-button" onClick={onClose} aria-label="Close modal">
          <X className="gpayhistorydetail-close-icon" />
        </button>
        <h2 className="gpayhistorydetail-title">Payment Details</h2>
        <div className="gpayhistorydetail-details-grid">
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Order ID:</span>
            <span className="gpayhistorydetail-value">{paymentDetail.orderId}</span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Payment ID:</span>
            <span className="gpayhistorydetail-value">{paymentDetail.paymentId}</span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Package Name:</span>
            <span className="gpayhistorydetail-value">{paymentDetail.packageName}</span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Payment Amount:</span>
            <span className="gpayhistorydetail-value">
              {paymentDetail.paymentAmount} {paymentDetail.currency}
            </span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Payment Method:</span>
            <span className="gpayhistorydetail-value">{paymentDetail.paymentMethod}</span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Payment Date:</span>
            <span className="gpayhistorydetail-value">{formatDate(paymentDetail.paymentDate)}</span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Payment Status:</span>
            <span className={`gpayhistorydetail-value gpayhistorydetail-status-${paymentDetail.status.toLowerCase()}`}>
              {paymentDetail.status}
            </span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Order Total Amount:</span>
            <span className="gpayhistorydetail-value">
              {paymentDetail.orderTotalAmount} {paymentDetail.currency}
            </span>
          </div>
          <div className="gpayhistorydetail-field">
            <span className="gpayhistorydetail-label">Order Status:</span>
            <span className="gpayhistorydetail-value">{paymentDetail.orderStatus}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GPackageOrderHistoryDetail
