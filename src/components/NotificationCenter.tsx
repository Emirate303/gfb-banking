import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useNotifications } from "../NotificationContext";

function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
  } = useNotifications();

  const [isOpen, setIsOpen] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
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
  }, []);

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

  function getTypeClass(
    type: string
  ) {
    return `notification-icon notification-${type}`;
  }

  function handleNotificationClick(
    id: string
  ) {
    markAsRead(id);
  }

  return (
    <div
      className="notification-center"
      ref={containerRef}
    >

      <button
        type="button"
        className={
          isOpen
            ? "notification-bell active"
            : "notification-bell"
        }
        onClick={() =>
          setIsOpen((current) => !current)
        }
        aria-label="Notifications"
        aria-expanded={isOpen}
      >

        <span className="notification-bell-icon">
          ♧
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

        <div className="notification-dropdown">

          <div className="notification-dropdown-header">

            <div>

              <p className="eyebrow">
                Guardian Federal Bank
              </p>

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

            <div className="notification-list">

              {notifications.map(
                (notification) => (

                  <div
                    className={
                      notification.read
                        ? "notification-item"
                        : "notification-item unread"
                    }
                    key={notification.id}
                    onClick={() =>
                      handleNotificationClick(
                        notification.id
                      )
                    }
                  >

                    <div
                      className={getTypeClass(
                        notification.type
                      )}
                    >
                      {getIcon(
                        notification.type
                      )}
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

                      <time>
                        {notification.date}
                      </time>

                    </div>


                    <button
                      type="button"
                      className="notification-delete"
                      aria-label={`Delete ${notification.title}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteNotification(
                          notification.id
                        );
                      }}
                    >
                      ×
                    </button>

                  </div>

                )
              )}

            </div>

          )}


          {notifications.length > 0 && (

            <div className="notification-dropdown-footer">

              <button
                type="button"
                onClick={clearNotifications}
              >
                Clear all notifications
              </button>

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default NotificationCenter;