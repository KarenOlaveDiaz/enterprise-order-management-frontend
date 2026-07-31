import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderStatusSelect } from './OrderStatusSelect';
import { DeleteOrderButton } from './DeleteOrderButton';
import type { Order ,OrderStatus} from '../types/order.types';

interface OrderTableProps {
  orders: Order[];
  onUpdateStatus: (
    orderId: string,
    status: OrderStatus,
  ) => Promise<void>;
  onDeleteOrder: (orderId: string) => Promise<void>
}

export function OrderTable({
  orders,
  onUpdateStatus,
  onDeleteOrder,
}: OrderTableProps) {
  if (orders.length === 0) {
    return <p>No orders were found.</p>;
  }

  return (
    <div className="orders-table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Change status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td>{order.customerEmail}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>

              <td>
                <OrderStatusBadge status={order.status} />
              </td>

              <td>
                <OrderStatusSelect
                  order={order}
                  onUpdateStatus={onUpdateStatus}
                 />
              </td>

              <td>
                {new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(order.createdAt))}
              </td>

              <td>
                <DeleteOrderButton
                  order={order}
                  onDeleteOrder={onDeleteOrder}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}