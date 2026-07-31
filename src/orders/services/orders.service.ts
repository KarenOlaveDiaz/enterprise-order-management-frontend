import type {
  CreateOrderData,
  Order,
  OrderStatus,
} from '../types/order.types';

const API_URL = import.meta.env.VITE_API_URL as string;

async function handleResponse<T>(
  response: Response,
  defaultErrorMessage: string,
): Promise<T> {
  if (response.status === 401) {
    throw new Error('Your session has expired');
  }

  if (!response.ok) {
    throw new Error(defaultErrorMessage);
  }

  return (await response.json()) as T;
}

export async function getOrders(
  accessToken: string,
): Promise<Order[]> {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse<Order[]>(
    response,
    'Unable to load orders',
  );
}

export async function createOrder(
  accessToken: string,
  orderData: CreateOrderData,
): Promise<Order> {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  return handleResponse<Order>(
    response,
    'Unable to create the order',
  );
}

export async function updateOrderStatus(
  accessToken: string,
  orderId: string,
  status: OrderStatus,
): Promise<Order> {
  const response = await fetch(
    `${API_URL}/orders/${orderId}/status`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    },
  );

  return handleResponse<Order>(
    response,
    'Unable to update the order status',
  );
}

export async function deleteOrder(
  accessToken: string,
  orderId: string,
): Promise<void> {
  const response = await fetch(
    `${API_URL}/orders/${orderId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.status === 401) {
    throw new Error('Your session has expired');
  }

  if (!response.ok) {
    throw new Error('Unable to delete the order');
  }
}