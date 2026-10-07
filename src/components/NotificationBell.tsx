import { useState } from "react";
import { useNotifications } from "../NotificationContext";

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
  } = useNotifications();

  function handleNotificationClick(
    id: string
  ) {
    markAsRead(id);
  }

  return (
    <div className="notification-container">

      <button
        type="button"
        className="notification-button"
        onClick={() =>
          setIsOpen((value) => !value)
        }
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <span className="notification-icon">
          ♧
        </span>

        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 9
              ? "9+"
              : unreadCount}
          </span>
        )}
      </button>


      {isOpen && (
        <div className="notification-dropdown">

          <div className="notification-header">

            <div>
              <span className="notification-eyebrow">
                Guardian Federal Bank
              </span>

              <h3>
                Notifications
              </h3>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                className="notification-mark-all"
                onClick={markAllAsRead}
              >
                Mark all read
              </button>
            )}

          </div>


          <div className="notification-list">

            {notifications.length === 0 ? (

              <div className="notification-empty">

                <div className="notification-empty-icon">
                  ✓
                </div>

                <strong>
                  You're all caught up
                </strong>

                <span>
                  New account activity and
                  security alerts will appear
                  here.
                </span>

              </div>

            ) : (

              notifications.map(
                (notification) => (

                  <div
                    key={notification.id}
                    className={`notification-item ${
                      notification.read
                        ? "read"
                        : "unread"
                    }`}
                    onClick={() =>
                      handleNotificationClick(
                        notification.id
                      )
                    }
                  >

                    <div
                      className={`notification-type notification-${notification.type}`}
                    >
                      {notification.type ===
                        "success" && "✓"}

                      {notification.type ===
                        "info" && "i"}

                      {notification.type ===
                        "warning" && "!"}

                      {notification.type ===
                        "security" && "•"}
                    </div>


                    <div className="notification-content">

                      <div className="notification-title-row">

                        <strong>
                          {notification.title}
                        </strong>

                        {!notification.read && (
                          <span className="notification-unread-dot" />
                        )}

                      </div>

                      <p>
                        {notification.message}
                      </p>

                      <small>
                        {notification.date}
                      </small>

                    </div>


                    <button
                      type="button"
                      className="notification-delete"
                      onClick={(event) => {
                        event.stopPropagation();

                        deleteNotification(
                          notification.id
                        );
                      }}
                      aria-label="Delete notification"
                    >
                      ×
                    </button>

                  </div>

                )
              )

            )}

          </div>


          {notifications.length > 0 && (
            <div className="notification-footer">

              <button
                type="button"
                onClick={clearNotifications}
              >
                Clear notifications
              </button>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default NotificationBell;