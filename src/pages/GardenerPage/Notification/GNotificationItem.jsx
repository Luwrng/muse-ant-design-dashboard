import React from "react";
import { useState } from "react";
import GNotificationPopup from "./GNotificationPopup";
import "./GNotificationItem.css";
import notificationService from "../../services/apiServices/notificationService";

function GNotificationItem({ notification }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleNotificationClick = async (e) => {
    try {
      await notificationService.updaNotificationStatus(
        notification.notificationId
      );
    } catch (err) {
      console.log(err);
    }

    e.stopPropagation();
    setShowPopup(true);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} weeks ago`;
  };

  return (
    <>
      <div
        className={`gnotiitem-notification-item ${
          !notification.isRead ? "unread" : ""
        }`}
      >
        {/* <div className="gnotiitem-notification-avatar">
          <img
            src={notification.avatar || "/placeholder.svg"}
            alt={notification.senderName}
          />
        </div> */}

        <div
          className="gnotiitem-notification-content"
          onClick={(e) => handleNotificationClick(e)}
        >
          <div className="gnotiitem-notification-message">
            <span className="gnotiitem-sender-name">{notification.sender}</span>
            <span className="gnotiitem-message-text">
              {notification.message}
            </span>
          </div>
          <div className="gnotiitem-notification-meta">
            {/* <span className="gnotiitem-category">{notification.category}</span>
            <span className="gnotiitem-separator">•</span> */}
            <span className="gnotiitem-time">
              {formatTimeAgo(notification.createdAt)}
            </span>
          </div>
        </div>

        {/* <div className="gnotiitem-notification-actions">
          <button
            className="gnotiitem-three-dots-btn"
            onClick={handleThreeDotsClick}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="19" cy="12" r="1" fill="currentColor" />
              <circle cx="5" cy="12" r="1" fill="currentColor" />
            </svg>
          </button>
        </div> */}
      </div>

      {showPopup && (
        <GNotificationPopup
          notification={notification}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}

export default GNotificationItem;
