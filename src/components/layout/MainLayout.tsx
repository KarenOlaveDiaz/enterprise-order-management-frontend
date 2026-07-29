import { NavLink, Outlet } from 'react-router';

export function MainLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="container header-content">
          <span className="brand">OrderFlow</span>

          <nav className="navigation" aria-label="Main navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/orders">Orders</NavLink>
            <NavLink to="/login">Login</NavLink>
          </nav>
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