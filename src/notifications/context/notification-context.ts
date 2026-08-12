import { createContext } from 'react';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

export interface NotificationContextValue {
  notify: (
    message: string,
    type?: NotificationType,
  ) => void;
}

export const NotificationContext =
  createContext<NotificationContextValue | undefined>(
    undefined,
  );