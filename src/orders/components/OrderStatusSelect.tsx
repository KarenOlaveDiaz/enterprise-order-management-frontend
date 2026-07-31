import { useState, type ChangeEvent } from 'react';
import type {
  Order,
  OrderStatus,
} from '../types/order.types';

interface OrderStatusSelectProps {
  order: Order;
  onUpdateStatus: (
    orderId: string,
    status: OrderStatus,
  ) => Promise<void>;
}

export function OrderStatusSelect({
  order,
  onUpdateStatus,
}: OrderStatusSelectProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null,
  );

  async function handleStatusChange(
    event: ChangeEvent<HTMLSelectElement>,
  ): Promise<void> {
    const newStatus = event.target.value as OrderStatus;

    try {
      setIsUpdating(true);
      setErrorMessage(null);

      await onUpdateStatus(order.id, newStatus);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred';

      setErrorMessage(message);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div>
      <select
        aria-label={`Update status for ${order.customerName}`}
        value={order.status}
        disabled={isUpdating}
        onChange={(event) => {
          void handleStatusChange(event);
        }}
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {isUpdating && <span> Updating...</span>}

      {errorMessage && (
        <p role="alert">{errorMessage}</p>
      )}
    </div>
  );
}