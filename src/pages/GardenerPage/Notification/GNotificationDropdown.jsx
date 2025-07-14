import React from "react";
import { useRef, useEffect } from "react";
import GNotificationItem from "./GNotificationItem";
import "./GNotificationDropdown.css";

function GNotificationDropdown({ notifications, onClose }) {
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
        <h3>Notifications</h3>
      </div>
      <div className="gnotidropdown-notification-list">
        {notifications.length === 0 ? (
          <div className="gnotidropdown-no-notifications">
            <p>No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <GNotificationItem
              key={notification.notificationId}
              notification={notification}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GNotificationDropdown;
