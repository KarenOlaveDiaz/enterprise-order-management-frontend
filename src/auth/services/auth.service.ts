import type {
    LoginCredentials,
    User,
  } from '../types/auth.types';
  
  interface LoginResponse {
    accessToken: string;
    user: User;
  }
  
  const API_URL = import.meta.env.VITE_API_URL as string;
  
  export async function loginRequest(
    credentials: LoginCredentials,
  ): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Correo o contraseña incorrectos');
      }
  
      throw new Error('No fue posible iniciar sesión');
    }
  
    return response.json() as Promise<LoginResponse>;
  }
  
  export async function getProfileRequest(
    accessToken: string,
  ): Promise<User> {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('La sesión no es válida');
    }
  
    return response.json() as Promise<User>;
  }