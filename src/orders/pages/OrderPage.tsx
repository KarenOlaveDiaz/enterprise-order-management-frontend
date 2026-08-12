import { useMemo, useState } from 'react';
import { CreateOrderForm } from '../components/CreateOrderForm';
import {
  OrdersFilters,
  type OrderStatusFilter,
} from '../components/OrdersFilters';
import { OrdersSummary } from '../components/OrdersSummary';
import { OrderTable } from '../components/OrderTable';
import { useOrders } from '../hooks/useOrders';
import { useNotification } from '../../notifications/hook/useNotification';
import { OrdersPagination } from '../components/OrdersPagination';

import type {
  OrderSortField,
  SortDirection,
} from '../types/order.types';
import { useAuth } from '../../auth/hooks/useAuth';

export function OrdersPage() {
  const {
    orders,
    isLoading,
    errorMessage,
    createOrder,
    updateOrderStatus,
    deleteOrder,
  } = useOrders();

  const { user } = useAuth();

  const isDemo = user?.role === 'DEMO';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] =
    useState<OrderStatusFilter>('all');
  
    const [sortField, setSortField] =
  useState<OrderSortField>('createdAt');

const [sortDirection, setSortDirection] =
  useState<SortDirection>('desc');

const [currentPage, setCurrentPage] = useState(1);

const PAGE_SIZE = 5;
    
const sortedOrders = useMemo(() => {
  const normalizedSearch = searchTerm
    .trim()
    .toLowerCase();

  const filtered = orders.filter((order) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      order.customerName
        .toLowerCase()
        .includes(normalizedSearch) ||
      order.customerEmail
        .toLowerCase()
        .includes(normalizedSearch) ||
      order.product
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesStatus =
      statusFilter === 'all' ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return [...filtered].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'customerName':
        comparison = a.customerName.localeCompare(
          b.customerName,
        );
        break;

      case 'product':
        comparison = a.product.localeCompare(b.product);
        break;

      case 'quantity':
        comparison = a.quantity - b.quantity;
        break;

      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;

      case 'createdAt':
        comparison =
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime();
        break;
      }

      return sortDirection === 'asc'
        ? comparison
        : -comparison;
    });
  }, [
    orders,
    searchTerm,
    statusFilter,
    sortField,
    sortDirection,
  ]);


  const totalPages = Math.max(
    1,
    Math.ceil(sortedOrders.length / PAGE_SIZE),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedOrders = useMemo(() => {
    const startIndex =
      (safeCurrentPage - 1) * PAGE_SIZE;
  
    return sortedOrders.slice(
      startIndex,
      startIndex + PAGE_SIZE,
    );
  }, [sortedOrders, safeCurrentPage]);

  function handleSearchChange(value: string): void {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function handleStatusChange(
    value: OrderStatusFilter,
  ): void {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  function handleSort(field: OrderSortField): void {
    if (field === sortField) {
      setSortDirection((currentDirection) =>
        currentDirection === 'asc'
          ? 'desc'
          : 'asc',
      );

      return;
    }

    setSortField(field);
    setSortDirection('asc');
  }

  const { notify } = useNotification();
  
  async function handleCreateOrder(
    orderData: Parameters<typeof createOrder>[0],
  ): Promise<void> {
    try {
      await createOrder(orderData);
      notify('Order created successfully', 'success');
    } catch {
      notify('Unable to create order', 'error');
      throw new Error('Unable to create order');
    }
  }
  
  async function handleUpdateOrderStatus(
    orderId: Parameters<typeof updateOrderStatus>[0],
    status: Parameters<typeof updateOrderStatus>[1],
  ): Promise<void> {
    try {
      await updateOrderStatus(orderId, status);
      notify('Order status updated', 'success');
    } catch {
      notify('Unable to update order status', 'error');
      throw new Error('Unable to update order status');
    }
  }
  
  async function handleDeleteOrder(
    orderId: Parameters<typeof deleteOrder>[0],
  ): Promise<void> {
    try {
      await deleteOrder(orderId);
      notify('Order deleted successfully', 'success');
    } catch {
      notify('Unable to delete order', 'error');
      throw new Error('Unable to delete order');
    }
  }

  if (isLoading) {
    return (
      <section>
        <h1>Orders</h1>
        <p>Loading orders...</p>
      </section>
    );
  }

  return (
    <section className="orders-page">
      <header className="orders-page-header">
        <div>
          <p className="eyebrow">
            Order management
          </p>

          <h1>Orders</h1>

          {isDemo && (
            <div className="demo-banner">
              <strong>Demo mode</strong>

              <span>
                You are exploring OrderFlow with restricted permissions.
              </span>
            </div>
          )}

          <p>
            Create, monitor and manage customer orders.
          </p>
        </div>
      </header>

      {errorMessage && (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      )}

      <OrdersSummary orders={orders} />

      <CreateOrderForm
        onCreateOrder={handleCreateOrder}
      />

      <OrdersFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />

      <p className="orders-results">
        Showing {paginatedOrders.length} of{' '}
        {sortedOrders.length} filtered orders
      </p>

      <OrderTable
        orders={paginatedOrders}
        canDelete={!isDemo}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onUpdateStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
      />
      <OrdersPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default OrdersPage;