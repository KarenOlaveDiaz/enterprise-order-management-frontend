import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import {
  createOrder as createOrderRequest,
  deleteOrder as deleteOrderRequest,
  getOrders,
  updateOrderStatus as updateOrderStatusRequest,
} from '../services/orders.service';
import type {
  CreateOrderData,
  Order,
  OrderStatus,
} from '../types/order.types';

interface UseOrdersResult {
  orders: Order[];
  isLoading: boolean;
  errorMessage: string | null;
  createOrder: (orderData: CreateOrderData) => Promise<void>;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
  ) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
}

export function useOrders(): UseOrdersResult {
  const { accessToken, logout } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null,
  );

  const handleError = useCallback(
    (error: unknown): void => {
      const message =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred';

      if (message === 'Your session has expired') {
        logout();
        return;
      }

      setErrorMessage(message);
    },
    [logout],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadOrders(): Promise<void> {
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage(null);

        const ordersResponse = await getOrders(accessToken);

        if (isMounted) {
          setOrders(ordersResponse);
        }
      } catch (error: unknown) {
        if (isMounted) {
          handleError(error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadOrders();

    return () => {
      isMounted = false;
    };
  }, [accessToken, handleError]);

  const createOrder = useCallback(
    async (orderData: CreateOrderData): Promise<void> => {
      if (!accessToken) {
        return;
      }

      try {
        setErrorMessage(null);

        const createdOrder = await createOrderRequest(
          accessToken,
          orderData,
        );

        setOrders((currentOrders) => [
          createdOrder,
          ...currentOrders,
        ]);
      } catch (error: unknown) {
        handleError(error);
        throw error;
      }
    },
    [accessToken, handleError],
  );

  const updateOrderStatus = useCallback(
    async (
      orderId: string,
      status: OrderStatus,
    ): Promise<void> => {
      if (!accessToken) {
        return;
      }

      try {
        setErrorMessage(null);

        const updatedOrder = await updateOrderStatusRequest(
          accessToken,
          orderId,
          status,
        );

        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            order.id === updatedOrder.id
              ? updatedOrder
              : order,
          ),
        );
      } catch (error: unknown) {
        handleError(error);
        throw error;
      }
    },
    [accessToken, handleError],
  );

  const deleteOrder = useCallback(
    async (orderId: string): Promise<void> => {
      if (!accessToken) {
        return;
      }

      try {
        setErrorMessage(null);

        await deleteOrderRequest(accessToken, orderId);

        setOrders((currentOrders) =>
          currentOrders.filter((order) => order.id !== orderId),
        );
      } catch (error: unknown) {
        handleError(error);
        throw error;
      }
    },
    [accessToken, handleError],
  );

  return {
    orders,
    isLoading,
    errorMessage,
    createOrder,
    updateOrderStatus,
    deleteOrder,
  };
}