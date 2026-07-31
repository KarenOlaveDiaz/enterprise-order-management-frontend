import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  getProfileRequest,
  loginRequest,
} from '../services/auth.service';
import type {
  AuthContextValue,
  LoginCredentials,
  User,
} from '../types/auth.types';
import { AuthContext } from './auth-context';

const TOKEN_STORAGE_KEY = 'orderflow_access_token';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem(TOKEN_STORAGE_KEY),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession(): Promise<void> {
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const profile = await getProfileRequest(accessToken);
        setUser(profile);
      } catch {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    void restoreSession();
  }, [accessToken]);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<void> => {
      const response = await loginRequest(credentials);
  
      localStorage.setItem(
        TOKEN_STORAGE_KEY,
        response.accessToken,
      );
  
      setAccessToken(response.accessToken);
      setUser(response.user);
    },
    [],
  );

  const logout = useCallback((): void => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setAccessToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      isLoading,
      login,
      logout,
    }),
    [user, accessToken, isLoading, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}