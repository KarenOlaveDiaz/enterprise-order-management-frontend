import { AppRouter } from './app/router/AppRouter';
import { AuthProvider } from './auth/context/AuthProvider';
import { NotificationProvider } from './notifications/context/NotificationProvider';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;