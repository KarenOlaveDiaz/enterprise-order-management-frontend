export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'operator';
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
  }