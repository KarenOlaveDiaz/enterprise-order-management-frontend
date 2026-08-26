import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { User } from '../../auth/types/auth.types';
import { OrdersPage } from './OrderPage';

const createOrderMock = vi.fn();
const updateOrderStatusMock = vi.fn();
const deleteOrderMock = vi.fn();
const notifyMock = vi.fn();

const ordersMock = [
  {
    id: '1',
    customerName: 'Karen Olave',
    customerEmail: 'karen@example.com',
    product: 'Business Laptop',
    quantity: 2,
    status: 'pending',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: '2',
    customerName: 'Felipe Soto',
    customerEmail: 'felipe@example.com',
    product: 'Monitor',
    quantity: 1,
    status: 'completed',
    createdAt: '2026-08-02T10:00:00.000Z',
    updatedAt: '2026-08-02T10:00:00.000Z',
  },
];

let currentUser: User = {
  id: 'admin-1',
  email: 'admin@orderflow.dev',
  name: 'Portfolio Administrator',
  role: 'ADMIN',
};

vi.mock('../hooks/useOrders', () => ({
  useOrders: () => ({
    orders: ordersMock,
    isLoading: false,
    errorMessage: null,
    createOrder: createOrderMock,
    updateOrderStatus: updateOrderStatusMock,
    deleteOrder: deleteOrderMock,
  }),
}));

vi.mock('../../auth/hooks/useAuth', () => ({
  useAuth: () => ({
    user: currentUser,
    isAuthenticated: true,
  }),
}));

vi.mock('../../notifications/hooks/useNotification', () => ({
  useNotification: () => ({
    notify: notifyMock,
  }),
}));

describe('OrdersPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    currentUser = {
      id: 'admin-1',
      email: 'admin@orderflow.dev',
      name: 'Portfolio Administrator',
      role: 'ADMIN',
    };
  });

  it('renders orders', () => {
    render(<OrdersPage />);

    expect(
      screen.getByText('Karen Olave'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Felipe Soto'),
    ).toBeInTheDocument();
  });

  it('filters orders by search term', async () => {
    const user = userEvent.setup();

    render(<OrdersPage />);

    const searchInput = screen.getByRole('searchbox');

    await user.type(searchInput, 'Karen');

    expect(
      screen.getByText('Karen Olave'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Felipe Soto'),
    ).not.toBeInTheDocument();
  });

  it('filters orders by status', async () => {
    const user = userEvent.setup();

    render(<OrdersPage />);

    const statusSelect = screen.getByLabelText('Status');

    await user.selectOptions(
      statusSelect,
      'completed',
    );

    expect(
      screen.getByText('Felipe Soto'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Karen Olave'),
    ).not.toBeInTheDocument();
  });

  it('shows order summary values', () => {
    render(<OrdersPage />);

    const summaryCards = screen.getAllByRole('article');

    expect(summaryCards).toHaveLength(5);

    expect(summaryCards[0]).toHaveTextContent('Total');
    expect(summaryCards[0]).toHaveTextContent('2');

    expect(summaryCards[1]).toHaveTextContent('Pending');
    expect(summaryCards[1]).toHaveTextContent('1');

    expect(summaryCards[3]).toHaveTextContent('Completed');
    expect(summaryCards[3]).toHaveTextContent('1');
  });

  it('creates a new order as ADMIN', async () => {
    const user = userEvent.setup();

    createOrderMock.mockResolvedValue(undefined);

    render(<OrdersPage />);

    await user.type(
      screen.getByLabelText(/customer name/i),
      'New Customer',
    );

    await user.type(
      screen.getByLabelText(/customer email/i),
      'new@example.com',
    );

    await user.type(
      screen.getByLabelText(/product/i),
      'Keyboard',
    );

    const quantityInput = screen.getByLabelText(/quantity/i);

    await user.clear(quantityInput);
    await user.type(quantityInput, '3');

    await user.click(
      screen.getByRole('button', {
        name: 'Create order',
      }),
    );

    expect(createOrderMock).toHaveBeenCalledWith({
      customerName: 'New Customer',
      customerEmail: 'new@example.com',
      product: 'Keyboard',
      quantity: 3,
    });

    expect(notifyMock).toHaveBeenCalledWith(
      'Order created successfully',
      'success',
    );
  });

  it('updates an order status as ADMIN', async () => {
    const user = userEvent.setup();

    updateOrderStatusMock.mockResolvedValue(undefined);

    render(<OrdersPage />);

    const statusSelectors = screen.getAllByRole('combobox');

    const orderStatusSelect = statusSelectors.find(
      (select) =>
        select.getAttribute('aria-label')?.includes(
          'status',
        ),
    );

    if (!orderStatusSelect) {
      throw new Error('Order status selector not found');
    }

    await user.selectOptions(
      orderStatusSelect,
      'processing',
    );

    expect(updateOrderStatusMock).toHaveBeenCalled();

    expect(notifyMock).toHaveBeenCalledWith(
      'Order status updated',
      'success',
    );
  });

  it('deletes an order after confirmation as ADMIN', async () => {
    const user = userEvent.setup();

    deleteOrderMock.mockResolvedValue(undefined);

    render(<OrdersPage />);

    const customerCell = screen.getByText('Karen Olave');

    const row = customerCell.closest('tr');

    if (!row) {
      throw new Error('Order row not found');
    }

    const deleteButton = within(row).getByRole('button', {
      name: 'Delete',
    });

    await user.click(deleteButton);

    expect(
      screen.getByRole('dialog'),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Delete order',
      }),
    );

    expect(deleteOrderMock).toHaveBeenCalledWith('1');

    expect(notifyMock).toHaveBeenCalledWith(
      'Order deleted successfully',
      'success',
    );
  });

  it('shows read-only mode for DEMO users', () => {
    currentUser = {
      id: 'demo-1',
      email: 'demo@orderflow.dev',
      name: 'Portfolio Demo',
      role: 'DEMO',
    };

    render(<OrdersPage />);

    expect(
      screen.getByText('Demo mode'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'You are exploring OrderFlow with restricted permissions.',
      ),
    ).toBeInTheDocument();
  });

  it('hides order creation for DEMO users', () => {
    currentUser = {
      id: 'demo-1',
      email: 'demo@orderflow.dev',
      name: 'Portfolio Demo',
      role: 'DEMO',
    };

    render(<OrdersPage />);

    expect(
      screen.queryByRole('button', {
        name: 'Create order',
      }),
    ).not.toBeInTheDocument();
  });

  it('prevents DEMO users from editing and deleting orders', () => {
    currentUser = {
      id: 'demo-1',
      email: 'demo@orderflow.dev',
      name: 'Portfolio Demo',
      role: 'DEMO',
    };

    render(<OrdersPage />);

    expect(
      screen.queryByRole('button', {
        name: 'Delete',
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getAllByText('Read only'),
    ).toHaveLength(2);

    expect(
      screen.getAllByText('Restricted'),
    ).toHaveLength(2);
  });
});