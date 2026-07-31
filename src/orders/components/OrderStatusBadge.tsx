import type { OrderStatus } from '../types/order.types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  return (
    <span className={`order-status order-status--${status}`}>
      {statusLabels[status]}
    </span>
  );
}