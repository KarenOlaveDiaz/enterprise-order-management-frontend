import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  OrdersFilters,
  type OrderStatusFilter,
} from './OrdersFilters';

describe('OrdersFilters', () => {
  it('calls onSearchChange when user types', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(
      <OrdersFilters
        searchTerm=""
        statusFilter="all"
        onSearchChange={onSearchChange}
        onStatusChange={vi.fn()}
      />,
    );

    const searchInput = screen.getByRole('searchbox');

    await user.type(searchInput, 'Karen');

    expect(onSearchChange).toHaveBeenCalled();
  });

  it('calls onStatusChange when selecting a status', async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();

    render(
      <OrdersFilters
        searchTerm=""
        statusFilter="all"
        onSearchChange={vi.fn()}
        onStatusChange={onStatusChange}
      />,
    );

    const statusSelect = screen.getByLabelText('Status');

    await user.selectOptions(statusSelect, 'completed');

    expect(onStatusChange).toHaveBeenCalledWith(
      'completed' as OrderStatusFilter,
    );
  });

  it('renders the current filter values', () => {
    render(
      <OrdersFilters
        searchTerm="Laptop"
        statusFilter="processing"
        onSearchChange={vi.fn()}
        onStatusChange={vi.fn()}
      />,
    );

    expect(
      screen.getByDisplayValue('Laptop'),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue('Processing'),
    ).toBeInTheDocument();
  });
});