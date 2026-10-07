import { useNotifications } from "../NotificationContext";

interface NotificationBellProps {
  onClick?: () => void;
}

function NotificationBell({
  onClick,
}: NotificationBellProps) {
  const { unreadCount } =
    useNotifications();

  return (
    <button
      type="button"
      className="notification-bell"
      onClick={onClick}
      aria-label={
        unreadCount > 0
          ? `${unreadCount} unread notifications`
          : "Notifications"
      }
      aria-haspopup="dialog"
    >
      <span
        className="notification-bell-icon"
        aria-hidden="true"
      >
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
  );
}

export default NotificationBell;