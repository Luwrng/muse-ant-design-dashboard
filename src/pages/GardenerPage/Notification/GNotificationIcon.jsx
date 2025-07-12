import React from "react";
import { useState } from "react";
import GNotificationDropdown from "./GNotificationDropdown";
import "./GNotificationIcon.css";

function GNotificationIcon({ notifications = [] }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="gnotiicon-notification-container">
      <div className="gnotiicon-notification-icon" onClick={toggleDropdown}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.73 21a2 2 0 0 1-3.46 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="gnotiicon-notification-badge">{unreadCount}</span>
        )}
      </div>

      {isDropdownOpen && (
        <GNotificationDropdown
          notifications={notifications}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}

export default GNotificationIcon;
