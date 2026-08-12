import {
    useCallback,
    useMemo,
    useState,
    type PropsWithChildren,
  } from 'react';
  import {
    NotificationContext,
    type Notification,
    type NotificationType,
  } from './notification-context';
  
  export function NotificationProvider({
    children,
  }: PropsWithChildren) {
    const [notifications, setNotifications] = useState<
      Notification[]
    >([]);
  
    const removeNotification = useCallback(
      (id: string): void => {
        setNotifications((current) =>
          current.filter(
            (notification) => notification.id !== id,
          ),
        );
      },
      [],
    );
  
    const notify = useCallback(
      (
        message: string,
        type: NotificationType = 'info',
      ): void => {
        const id = crypto.randomUUID();
  
        setNotifications((current) => [
          ...current,
          {
            id,
            message,
            type,
          },
        ]);
  
        window.setTimeout(() => {
          removeNotification(id);
        }, 3500);
      },
      [removeNotification],
    );
  
    const value = useMemo(
      () => ({
        notify,
      }),
      [notify],
    );
  
    return (
      <NotificationContext.Provider value={value}>
        {children}
  
        <div
          className="toast-container"
          aria-live="polite"
          aria-atomic="true"
        >
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`toast toast--${notification.type}`}
            >
              <span>{notification.message}</span>
  
              <button
                type="button"
                aria-label="Close notification"
                onClick={() => {
                  removeNotification(notification.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </NotificationContext.Provider>
    );
  }