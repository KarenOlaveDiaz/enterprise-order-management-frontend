import type { ChangeEvent } from 'react';
import type { OrderStatus } from '../types/order.types';

export type OrderStatusFilter = OrderStatus | 'all';

interface OrdersFiltersProps {
  searchTerm: string;
  statusFilter: OrderStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: OrderStatusFilter) => void;
}

export function OrdersFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: OrdersFiltersProps) {
  function handleSearchChange(
    event: ChangeEvent<HTMLInputElement>,
  ): void {
    onSearchChange(event.target.value);
  }

  function handleStatusChange(
    event: ChangeEvent<HTMLSelectElement>,
  ): void {
    onStatusChange(event.target.value as OrderStatusFilter);
  }

  return (
    <div className="orders-filters">
      <div className="orders-filter-field">
        <label htmlFor="order-search">Search</label>

        <input
          id="order-search"
          type="search"
          placeholder="Customer, email or product..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="orders-filter-field">
        <label htmlFor="status-filter">Status</label>

        <select
          id="status-filter"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
}