import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type:
    | "success"
    | "info"
    | "warning"
    | "security";
  date: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (
    title: string,
    message: string,
    type?: NotificationItem["type"]
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext =
  createContext<
    NotificationContextType | undefined
  >(undefined);

const STORAGE_KEY = "gfb_notifications";

function getInitialNotifications(): NotificationItem[] {
  const saved =
    localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(
      getInitialNotifications
    );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(notifications)
    );
  }, [notifications]);

  function addNotification(
    title: string,
    message: string,
    type: NotificationItem["type"] = "info"
  ) {
    const notification: NotificationItem = {
      id: `notification-${Date.now()}`,
      title,
      message,
      type,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }
      ),
      read: false,
    };

    setNotifications((current) => [
      notification,
      ...current,
    ]);
  }

  function markAsRead(id: string) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }

  function deleteNotification(id: string) {
    setNotifications((current) =>
      current.filter(
        (notification) =>
          notification.id !== id
      )
    );
  }

  function clearNotifications() {
    setNotifications([]);
  }

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context =
    useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
}