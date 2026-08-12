import { useState } from 'react';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import type { Order } from '../types/order.types';

interface DeleteOrderButtonProps {
  order: Order;
  onDeleteOrder: (orderId: string) => Promise<void>;
}

export function DeleteOrderButton({
  order,
  onDeleteOrder,
}: DeleteOrderButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null,
  );

  async function handleDelete(): Promise<void> {
    try {
      setIsDeleting(true);
      setErrorMessage(null);

      await onDeleteOrder(order.id);

      setIsDialogOpen(false);
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
    <>
      <button
        type="button"
        className="delete-order-button"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        Delete
      </button>

      {errorMessage && (
        <p role="alert" className="form-error">
          {errorMessage}
        </p>
      )}

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Delete order"
        description={`Are you sure you want to delete the order for ${order.customerName}? This action cannot be undone.`}
        confirmLabel="Delete order"
        isConfirming={isDeleting}
        onCancel={() => {
          if (!isDeleting) {
            setIsDialogOpen(false);
          }
        }}
        onConfirm={() => {
          void handleDelete();
        }}
      />
    </>
  );
}