import { BrowserRouter, Route, Routes } from 'react-router';
import { MainLayout } from '../../components/layout/MainLayout';
import { HomePage } from '../../pages/HomePage/HomePage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { OrdersPage } from '../../pages/OrdersPage/OrdersPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}