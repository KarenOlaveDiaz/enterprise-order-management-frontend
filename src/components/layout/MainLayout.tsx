import { NavLink, Outlet } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';

export function MainLayout() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="container header-content">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>

          <span>
            Order<span className="brand-highlight">Flow</span>
          </span>
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
            <div className="current-user">
              <span>{user.name}</span>

              {user.role === 'DEMO' && (
                <span className="demo-role-badge">
                  Demo
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="container main-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="container footer-content">
          <div>
            <strong>OrderFlow</strong>
            <span>Enterprise Order Management</span>
          </div>

          <div className="footer-meta">
            <span>
              Designed &amp; Developed by Karen Olave
            </span>

            <span>Portfolio Project · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}