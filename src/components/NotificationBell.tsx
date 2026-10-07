import { useState } from "react";
import { useNotifications } from "../NotificationContext";
import NotificationCenter from "./NotificationCenter";

function NotificationBell() {
  const {
    unreadCount,
  } = useNotifications();

  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <div className="notification-bell-wrapper">

      <button
        type="button"
        className={
          isOpen
            ? "notification-bell active"
            : "notification-bell"
        }
        aria-label="Notifications"
        aria-expanded={isOpen}
        onClick={() =>
          setIsOpen((current) => !current)
        }
      >

        <span className="notification-bell-icon">
          ♢
        </span>

        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}

      </button>

      {isOpen && (
        <NotificationCenter
          onClose={() =>
            setIsOpen(false)
          }
        />
      )}

    </div>
  );
}

export default NotificationBell;