import type { Order } from '../types/order.types';

interface OrdersSummaryProps {
  orders: Order[];
}

export function OrdersSummary({
  orders,
}: OrdersSummaryProps) {
  const pending = orders.filter(
    (order) => order.status === 'pending',
  ).length;

  const processing = orders.filter(
    (order) => order.status === 'processing',
  ).length;

  const completed = orders.filter(
    (order) => order.status === 'completed',
  ).length;

  const cancelled = orders.filter(
    (order) => order.status === 'cancelled',
  ).length;

  return (
    <div className="orders-summary">
      <article className="summary-card">
        <span>Total</span>
        <strong>{orders.length}</strong>
      </article>

      <article className="summary-card">
        <span>Pending</span>
        <strong>{pending}</strong>
      </article>

      <article className="summary-card">
        <span>Processing</span>
        <strong>{processing}</strong>
      </article>

      <article className="summary-card">
        <span>Completed</span>
        <strong>{completed}</strong>
      </article>

      <article className="summary-card">
        <span>Cancelled</span>
        <strong>{cancelled}</strong>
      </article>
    </div>
  );
}