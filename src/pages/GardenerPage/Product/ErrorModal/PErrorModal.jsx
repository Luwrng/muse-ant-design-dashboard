import React from "react";
import "./PErrorModal.css";

function PErrorModal({ isOpen, title, message, onClose }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const CloseIcon = () => (
    <svg
      className="gperror-small-icon"
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

  const ErrorIcon = () => (
    <svg className="gperror-icon" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="gperror-overlay" onClick={handleOverlayClick}>
      <div className="gperror-modal">
        <button className="gperror-close" onClick={onClose}>
          <CloseIcon />
        </button>

        <ErrorIcon />

        <h2 className="gperror-title">{title}</h2>
        <p className="gperror-message">{message}</p>

        <button className="gperror-button" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export default PErrorModal;
