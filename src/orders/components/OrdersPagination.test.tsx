import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { OrdersPagination } from './OrdersPagination';

describe('OrdersPagination', () => {
  it('does not render when there is only one page', () => {
    render(
      <OrdersPagination
        currentPage={1}
        totalPages={1}
        onPageChange={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole('navigation'),
    ).not.toBeInTheDocument();
  });

  it('moves to the next page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <OrdersPagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Next',
      }),
    );

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('moves to the previous page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <OrdersPagination
        currentPage={2}
        totalPages={3}
        onPageChange={onPageChange}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Previous',
      }),
    );

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('disables navigation at boundaries', () => {
    const { rerender } = render(
      <OrdersPagination
        currentPage={1}
        totalPages={3}
        onPageChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: 'Previous',
      }),
    ).toBeDisabled();

    rerender(
      <OrdersPagination
        currentPage={3}
        totalPages={3}
        onPageChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: 'Next',
      }),
    ).toBeDisabled();
  });
});