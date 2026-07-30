import { NavLink, Outlet } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';

export function MainLayout() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="container header-content">
          <NavLink className="brand" to="/">
            OrderFlow
          </NavLink>

          <nav className="navigation" aria-label="Main navigation">
            <NavLink to="/">Home</NavLink>

            {isAuthenticated && <NavLink to="/orders">Orders</NavLink>}

            {!isAuthenticated ? (
              <NavLink to="/login">Login</NavLink>
            ) : (
              <button
                className="logout-button"
                type="button"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </nav>

          {user && (
            <span className="current-user">
              {user.name} · {user.role}
            </span>
          )}
        </div>
      </header>

      <main className="container main-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="container">
          Enterprise Order Management Portfolio
        </div>
      </footer>
    </div>
  );
}