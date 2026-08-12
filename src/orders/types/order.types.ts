export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  product: string;
  quantity: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  product: string;
  quantity: number;
}

export type OrderSortField =
  | 'customerName'
  | 'product'
  | 'quantity'
  | 'status'
  | 'createdAt';

export type SortDirection = 'asc' | 'desc';