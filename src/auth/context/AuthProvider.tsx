import {
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { AuthContext } from './auth-context';
import type {
  AuthContextValue,
  LoginCredentials,
  User,
} from '../types/auth.types';

const MOCK_USER: User = {
  id: '1',
  name: 'Portfolio Administrator',
  email: 'admin@orderflow.dev',
  role: 'admin',
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  async function login(credentials: LoginCredentials): Promise<void> {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 600);
    });

    const validCredentials =
      credentials.email === 'admin@orderflow.dev' &&
      credentials.password === 'Admin123!';

    if (!validCredentials) {
      throw new Error('Invalid email or password');
    }

    setUser(MOCK_USER);
  }

  function logout(): void {
    setUser(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}