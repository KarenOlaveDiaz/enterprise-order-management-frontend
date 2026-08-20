import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LoginPage } from './LoginPage';

const loginMock = vi.fn();

vi.mock('../../auth/hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    login: loginMock,
  }),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderLoginPage() {
    return render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
  }

  it('renders the login form', () => {
    renderLoginPage();

    expect(
      screen.getByRole('heading', {
        name: 'Welcome back',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('Email address'),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('Password'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Sign in',
      }),
    ).toBeInTheDocument();
  });

  it('shows and hides the password', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    const passwordInput =
      screen.getByLabelText<HTMLInputElement>('Password');

    expect(passwordInput.type).toBe('password');

    await user.click(
      screen.getByRole('button', {
        name: 'Show password',
      }),
    );

    expect(passwordInput.type).toBe('text');

    await user.click(
      screen.getByRole('button', {
        name: 'Hide password',
      }),
    );

    expect(passwordInput.type).toBe('password');
  });

  it('submits the entered credentials', async () => {
    const user = userEvent.setup();

    loginMock.mockResolvedValue(undefined);

    renderLoginPage();

    await user.type(
      screen.getByLabelText('Email address'),
      'admin@orderflow.dev',
    );

    await user.type(
      screen.getByLabelText('Password'),
      'Admin123!',
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Sign in',
      }),
    );

    expect(loginMock).toHaveBeenCalledWith({
      email: 'admin@orderflow.dev',
      password: 'Admin123!',
    });
  });

  it('shows an error when login fails', async () => {
    const user = userEvent.setup();

    loginMock.mockRejectedValue(
      new Error('Unauthorized'),
    );

    renderLoginPage();

    await user.type(
      screen.getByLabelText('Email address'),
      'wrong@example.com',
    );

    await user.type(
      screen.getByLabelText('Password'),
      'wrong-password',
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Sign in',
      }),
    );

    expect(
      await screen.findByRole('alert'),
    ).toHaveTextContent(
      'Unable to sign in with the provided credentials.',
    );
  });

  it('fills demo credentials', async () => {
    const user = userEvent.setup();
  
    renderLoginPage();
  
    await user.click(
      screen.getByRole('button', {
        name: 'Use demo account',
      }),
    );
  
    expect(
      screen.getByLabelText('Email address'),
    ).toHaveValue('demo@orderflow.dev');
  
    expect(
      screen.getByLabelText('Password'),
    ).toHaveValue('Demo123!');
  });
});