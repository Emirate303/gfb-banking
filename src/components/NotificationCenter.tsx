import { useEffect, useRef } from "react";
import { useNotifications } from "../NotificationContext";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

function NotificationCenter({
  isOpen,
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

  const panelRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleOutsideClick(
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
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  function getIcon(
    type: string
  ) {
    switch (type) {
      case "success":
        return "✓";

      case "warning":
        return "!";

      case "security":
        return "◆";

      default:
        return "i";
    }
  }

  return (
    <div
      ref={panelRef}
      className="notification-center"
      role="dialog"
      aria-label="Notifications"
    >

      <div className="notification-center-header">

        <div>
          <span className="notification-center-eyebrow">
            GFB ALERTS
          </span>

          <h2>
            Notifications
          </h2>
        </div>

        <button
          type="button"
          className="notification-close"
          onClick={onClose}
          aria-label="Close notifications"
        >
          ×
        </button>

      </div>


      <div className="notification-center-actions">

        <span>
          {unreadCount === 0
            ? "You're all caught up"
            : `${unreadCount} unread`}
        </span>

        {unreadCount > 0 && (
          <button
            type="button"
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
              No notifications
            </strong>

            <p>
              You're all caught up. New
              account activity will appear
              here.
            </p>

          </div>

        ) : (

          notifications.map(
            (notification) => (

              <div
                className={`notification-item ${
                  notification.read
                    ? "read"
                    : "unread"
                }`}
                key={notification.id}
              >

                <button
                  type="button"
                  className={`notification-item-icon ${notification.type}`}
                  onClick={() => {
                    if (
                      !notification.read
                    ) {
                      markAsRead(
                        notification.id
                      );
                    }
                  }}
                  aria-label={
                    notification.read
                      ? "Notification"
                      : "Mark notification as read"
                  }
                >
                  {getIcon(
                    notification.type
                  )}
                </button>


                <div className="notification-item-content">

                  <div className="notification-item-top">

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


                <div className="notification-item-actions">

                  {!notification.read && (
                    <button
                      type="button"
                      onClick={() =>
                        markAsRead(
                          notification.id
                        )
                      }
                      aria-label="Mark as read"
                      title="Mark as read"
                    >
                      ✓
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      deleteNotification(
                        notification.id
                      )
                    }
                    aria-label="Delete notification"
                    title="Delete notification"
                  >
                    ×
                  </button>

                </div>

              </div>

            )
          )

        )}

      </div>


      {notifications.length > 0 && (
        <div className="notification-center-footer">

          <button
            type="button"
            onClick={clearNotifications}
          >
            Clear all notifications
          </button>

        </div>
      )}

    </div>
  );
}

export default NotificationCenter;