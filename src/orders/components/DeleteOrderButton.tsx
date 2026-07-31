import { useState } from 'react';
import type { Order } from '../types/order.types';

interface DeleteOrderButtonProps {
  order: Order;
  onDeleteOrder: (orderId: string) => Promise<void>;
}

export function DeleteOrderButton({
  order,
  onDeleteOrder,
}: DeleteOrderButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null,
  );

  async function handleDelete(): Promise<void> {
    const shouldDelete = window.confirm(
      `Delete the order for ${order.customerName}?`,
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      setErrorMessage(null);

      await onDeleteOrder(order.id);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred';

      setErrorMessage(message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={isDeleting}
        onClick={() => {
          void handleDelete();
        }}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>

      {errorMessage && (
        <p role="alert">{errorMessage}</p>
      )}
    </div>
  );
}