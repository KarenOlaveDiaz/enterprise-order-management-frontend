import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CreateOrderForm } from './CreateOrderForm';

describe('CreateOrderForm', () => {
  it('submits a new order', async () => {
    const user = userEvent.setup();

    const onCreateOrder = vi.fn().mockResolvedValue(undefined);

    render(
      <CreateOrderForm
        onCreateOrder={onCreateOrder}
      />,
    );

    await user.type(
      screen.getByLabelText(/customer name/i),
      'Karen Olave',
    );

    await user.type(
      screen.getByLabelText(/customer email/i),
      'karen@example.com',
    );

    await user.type(
      screen.getByLabelText(/product/i),
      'Business Laptop',
    );

    await user.clear(
      screen.getByLabelText(/quantity/i),
    );

    await user.type(
      screen.getByLabelText(/quantity/i),
      '2',
    );

    await user.click(
      screen.getByRole('button', {
        name: /create/i,
      }),
    );

    expect(onCreateOrder).toHaveBeenCalledWith({
      customerName: 'Karen Olave',
      customerEmail: 'karen@example.com',
      product: 'Business Laptop',
      quantity: 2,
    });
  });
});