import React from "react";
import { useRef, useEffect } from "react";
import "./GNotificationPopup.css";

function GNotificationPopup({ notification, onClose }) {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="gnotipopup-popup-overlay">
      <div className="gnotipopup-notification-popup" ref={popupRef}>
        <div className="gnotipopup-popup-header">
          <h3>Notification Details</h3>
          <button className="gnotipopup-close-btn" onClick={onClose}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="gnotipopup-popup-content">
          <div className="gnotipopup-popup-field">
            <label>Sender Name:</label>
            <span>{notification.senderName}</span>
          </div>

          <div className="gnotipopup-popup-field">
            <label>Message:</label>
            <span>{notification.message}</span>
          </div>

          {notification.link && (
            <div className="gnotipopup-popup-field">
              <label>Link:</label>
              <a
                href={notification.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {notification.link}
              </a>
            </div>
          )}

          <div className="gnotipopup-popup-field">
            <label>Send At:</label>
            <span>{formatDateTime(notification.sendAt)}</span>
          </div>

          <div className="gnotipopup-popup-field">
            <label>Status:</label>
            <span
              className={`gnotipopup-status ${
                notification.isRead ? "read" : "unread"
              }`}
            >
              {notification.isRead ? "Read" : "Unread"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GNotificationPopup;
