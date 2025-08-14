import React from "react";
import { useRef, useEffect } from "react";
import GNotificationItem from "./GNotificationItem";
import "./GNotificationDropdown.css";

function GNotificationDropdown({ notifications, unreadCount, onClose }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="gnotidropdown-notification-dropdown" ref={dropdownRef}>
      <div className="gnotidropdown-notification-header">
        <h3>Các thông báo</h3>
      </div>
      <div className="gnotidropdown-notification-list">
        {notifications.length === 0 ? (
          <div className="gnotidropdown-no-notifications">
            <p>Hiện bạn chưa có thông báo.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <GNotificationItem
              key={notification.notificationId}
              unreadCount={unreadCount}
              notification={notification}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GNotificationDropdown;
