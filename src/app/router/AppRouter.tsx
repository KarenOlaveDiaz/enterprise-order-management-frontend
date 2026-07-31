import { BrowserRouter, Route, Routes } from 'react-router';
import { ProtectedRoute } from '../../auth/components/ProtectedRoute';
import { MainLayout } from '../../components/layout/MainLayout';
import { HomePage } from '../../pages/HomePage/HomePage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { OrdersPage } from '../../orders/pages/OrderPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />

          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}