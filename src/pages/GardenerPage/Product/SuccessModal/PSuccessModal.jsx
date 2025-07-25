import React from "react";
import "./PSuccessModal.css";

function PSuccessModal({ isOpen, title, message, onClose }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const CloseIcon = () => (
    <svg
      className="gpsuccess-small-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="gpsuccess-icon" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="gpsuccess-overlay" onClick={handleOverlayClick}>
      <div className="gpsuccess-modal">
        <button className="gpsuccess-close" onClick={onClose}>
          <CloseIcon />
        </button>

        <CheckIcon />

        <h2 className="gpsuccess-title">{title}</h2>
        <p className="gpsuccess-message">{message}</p>

        <button className="gpsuccess-button" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export default PSuccessModal;
