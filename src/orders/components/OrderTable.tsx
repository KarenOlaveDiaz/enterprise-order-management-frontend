import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderStatusSelect } from './OrderStatusSelect';
import { DeleteOrderButton } from './DeleteOrderButton';
import type {
  Order,
  OrderSortField,
  SortDirection,
} from '../types/order.types';

interface OrderTableProps {
  orders: Order[];
  canEdit: boolean;
  canDelete: boolean;
  sortField: OrderSortField;
  sortDirection: SortDirection;
  onSort: (field: OrderSortField) => void;
  onUpdateStatus: (
    orderId: string,
    status: Order['status'],
  ) => Promise<void>;
  onDeleteOrder: (orderId: string) => Promise<void>;
}

export function OrderTable({
  orders,
  canEdit,
  canDelete,
  sortField,
  sortDirection,
  onSort,
  onUpdateStatus,
  onDeleteOrder,
}: OrderTableProps) {
  function getSortIndicator(field: OrderSortField): string {
    if (sortField !== field) {
      return '';
    }
  
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty-state">
        <strong>No orders found</strong>
        <p>
          Try adjusting your search or filters, or create a new order.
        </p>
      </div>
    );
  }

  return (
    <div className="orders-table-container">
      <table className="orders-table">
        <thead>
          <tr>
           <th>
              <button
                type="button"
                className="table-sort-button"
                onClick={() => {
                  onSort('customerName');
                }}
              >
                Customer
                {getSortIndicator('customerName')}
              </button>
            </th>

            <th>Email</th>

            <th>
              <button
                type="button"
                className="table-sort-button"
                onClick={() => {
                  onSort('product');
                }}
              >
                Product
                {getSortIndicator('product')}
              </button>
            </th>

            <th>
              <button
                type="button"
                className="table-sort-button"
                onClick={() => {
                  onSort('quantity');
                }}
              >
                Quantity
                {getSortIndicator('quantity')}
              </button>
            </th>

            <th>
              <button
                type="button"
                className="table-sort-button"
                onClick={() => {
                  onSort('status');
                }}
              >
                Status
                {getSortIndicator('status')}
              </button>
            </th>

            <th>Change status</th>

            <th>
              <button
                type="button"
                className="table-sort-button"
                onClick={() => {
                  onSort('createdAt');
                }}
              >
                Created
                {getSortIndicator('createdAt')}
              </button>
            </th>

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
                {canEdit ? (
                  <OrderStatusSelect
                    order={order}
                    onUpdateStatus={onUpdateStatus}
                  />
                ) : (
                  <span className="restricted-action">
                    Read only
                  </span>
                )}
              </td>

              <td>
                {new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(order.createdAt))}
              </td>

              <td>
              {canDelete ? (
                <DeleteOrderButton
                  order={order}
                  onDeleteOrder={onDeleteOrder}
                />
              ) : (
                <span className="restricted-action">
                  Restricted
                </span>
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}