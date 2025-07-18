import React from "react";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react" // Using Lucide React for icons
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./PaymentResult.css";

function PaymentResult() {
  const [isSuccess, setIsSuccess] = useState(true) // Default to success for demonstration
  const history = useHistory();

  // useEffect(() => {
  //   // Simulate fetching payment status from URL query parameters
  //   // For example, navigate to /gpayresult?status=fail to see the failure state
  //   const params = new URLSearchParams(window.location.search)
  //   const status = params.get("status")
  //   if (status === "fail") {
  //     setIsSuccess(false)
  //   } else {
  //     setIsSuccess(true)
  //   }
  // }, [])

  const handleGoBack = () => {
    history.push("/landing")
  }

  return (
    <div className={`gpayresult-container ${isSuccess ? "gpayresult-success-bg" : "gpayresult-fail-bg"}`}>
      <div className="gpayresult-card">
        <button onClick={handleGoBack} className="gpayresult-go-back">
          <ArrowLeft size={16} /> Go Back
        </button>

        <div className="gpayresult-status-icon">
          {isSuccess ? (
            <CheckCircle className="gpayresult-icon-success" size={80} />
          ) : (
            <XCircle className="gpayresult-icon-fail" size={80} />
          )}
        </div>

        <h1 className={`gpayresult-title ${isSuccess ? "gpayresult-text-success" : "gpayresult-text-fail"}`}>
          {isSuccess ? "Payment Successful! 🌱" : "Payment Failed 😔"}
        </h1>
        <p className="gpayresult-message">
          {isSuccess
            ? "Welcome to the GreenGrow community! Your gardening journey starts now."
            : "We couldn't process your payment. Please try again or contact support."}
        </p>

        <div
          className={`gpayresult-details-section ${isSuccess ? "gpayresult-details-success-border" : "gpayresult-details-fail-border"}`}
        >
          <h2 className={`gpayresult-details-title ${isSuccess ? "gpayresult-text-success" : "gpayresult-text-fail"}`}>
            {isSuccess ? "Package Details" : "Transaction Details"}
          </h2>
          <div className="gpayresult-detail-row">
            <span className="gpayresult-detail-label">Package</span>
            <span className="gpayresult-detail-value">Premium Gardener Package</span>
          </div>
          <div className="gpayresult-detail-row">
            <span className="gpayresult-detail-label">Transaction ID</span>
            <span className="gpayresult-detail-value">TXN-1752742015648</span>
          </div>
          <div className="gpayresult-detail-row">
            <span className="gpayresult-detail-label">{isSuccess ? "Purchase Date" : "Attempted Date"}</span>
            <span className="gpayresult-detail-value">17/07/2025</span>
          </div>
        </div>

        {!isSuccess && (
          <div className="gpayresult-error-alert">
            <h3 className="gpayresult-error-title">Payment Error</h3>
            <p className="gpayresult-error-message">
              Your card was declined. Please check your payment details or try a different payment method.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentResult;
