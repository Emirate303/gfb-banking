import { useEffect, useRef } from "react";
import { useNotifications } from "../NotificationContext";

interface NotificationCenterProps {
  onClose: () => void;
}

function NotificationCenter({
  onClose,
}: NotificationCenterProps) {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
  } = useNotifications();

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        panelRef.current &&
        !panelRef.current.contains(
          event.target as Node
        )
      ) {
        onClose();
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [onClose]);

  function getIcon(
    type: string
  ) {
    switch (type) {
      case "success":
        return "✓";

      case "warning":
        return "!";

      case "security":
        return "⌁";

      default:
        return "i";
    }
  }

  return (
    <div
      ref={panelRef}
      className="notification-center"
    >
      <div className="notification-center-header">

        <div>
          <p className="eyebrow">
            GFB Alerts
          </p>

          <h2>
            Notifications
          </h2>
        </div>

        {unreadCount > 0 && (
          <span className="notification-count">
            {unreadCount}
          </span>
        )}

      </div>

      <div className="notification-actions">

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        )}

        {notifications.length > 0 && (
          <button
            type="button"
            onClick={clearNotifications}
          >
            Clear all
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

            <p>
              New account activity and
              security alerts will appear
              here.
            </p>

          </div>

        ) : (

          notifications.map(
            (notification) => (

              <div
                key={notification.id}
                className={
                  notification.read
                    ? "notification-item"
                    : "notification-item unread"
                }
              >

                <button
                  type="button"
                  className="notification-content"
                  onClick={() =>
                    markAsRead(
                      notification.id
                    )
                  }
                >

                  <div
                    className={`notification-icon ${notification.type}`}
                  >
                    {getIcon(
                      notification.type
                    )}
                  </div>

                  <div className="notification-copy">

                    <strong>
                      {notification.title}
                    </strong>

                    <p>
                      {notification.message}
                    </p>

                    <small>
                      {notification.date}
                    </small>

                  </div>

                </button>

                <button
                  type="button"
                  className="notification-delete"
                  aria-label="Delete notification"
                  onClick={() =>
                    deleteNotification(
                      notification.id
                    )
                  }
                >
                  ×
                </button>

              </div>

            )
          )

        )}

      </div>

    </div>
  );
}

export default NotificationCenter;