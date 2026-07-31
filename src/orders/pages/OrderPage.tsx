import { CreateOrderForm } from '../components/CreateOrderForm';
import { OrderTable } from '../components/OrderTable';
import { useOrders } from '../hooks/useOrders';

export function OrdersPage() {
  const {
    orders,
    isLoading,
    errorMessage,
    createOrder,
    updateOrderStatus,
    deleteOrder,
  } = useOrders();

  if (isLoading) {
    return (
      <section>
        <h1>Orders</h1>
        <p>Loading orders...</p>
      </section>
    );
  }

  return (
    <section>
      <header>
        <h1>Orders</h1>

        <p>
          Manage customer orders and their current status.
        </p>
      </header>

      {errorMessage && (
        <p role="alert">{errorMessage}</p>
      )}

      <CreateOrderForm
        onCreateOrder={createOrder}
      />

      <OrderTable
        orders={orders}
        onUpdateStatus={updateOrderStatus}
        onDeleteOrder={deleteOrder}
      />
    </section>
  );
}

export default OrdersPage;