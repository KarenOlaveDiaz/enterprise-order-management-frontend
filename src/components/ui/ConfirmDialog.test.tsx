import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('does not render when closed', () => {
    render(
      <ConfirmDialog
        isOpen={false}
        title="Delete order"
        description="This action cannot be undone."
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole('dialog'),
    ).not.toBeInTheDocument();
  });

  it('renders the dialog when open', () => {
    render(
      <ConfirmDialog
        isOpen
        title="Delete order"
        description="This action cannot be undone."
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('dialog'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Delete order'),
    ).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <ConfirmDialog
        isOpen
        title="Delete order"
        description="This action cannot be undone."
        confirmLabel="Delete order"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Delete order',
      }),
    );

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <ConfirmDialog
        isOpen
        title="Delete order"
        description="This action cannot be undone."
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Cancel',
      }),
    );

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});