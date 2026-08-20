import { render, screen } from '@testing-library/react';
import {
  MemoryRouter,
  Route,
  Routes,
} from 'react-router';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { ProtectedRoute } from './ProtectedRoute';

const useAuthMock = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders protected content when authenticated', () => {
    useAuthMock.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/orders']}>
        <Routes>
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <div>Protected content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByText('Protected content'),
    ).toBeInTheDocument();
  });

  it('shows loading state while authentication is loading', () => {
    useAuthMock.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={['/orders']}>
        <Routes>
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <div>Protected content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.queryByText('Protected content'),
    ).not.toBeInTheDocument();
  });

  it('redirects unauthenticated users to login', () => {
    useAuthMock.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/orders']}>
        <Routes>
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <div>Protected content</div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<div>Login page</div>}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByText('Login page'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Protected content'),
    ).not.toBeInTheDocument();
  });
});